import { DB_INFO } from "../../constants.js";
import { getPool } from "$config/database.js";
import EntregaController from "../controllers/entrega.js";

import AvaliacaoCriterio from "$lib/models/AvaliacaoCriterio.js";
import AvaliacaoIntegranteCriterio from "$lib/models/AvaliacaoIntegranteCriterio.js";

const entregaController = new EntregaController();

export async function avaliaEntregaBD(idEntrega, criteriosAvaliados) {

	try {
		const db = getPool();
		const entrega = await entregaController.buscaPorId(idEntrega);


		if (!entrega) {
			throw new Error(`Entrega ${idEntrega} não encontrada`);
		}

		let idRealizarAvaliacao
		let sql

		const res = await db.query({
			text: `INSERT INTO ${DB_INFO.tables.realizar_avaliacao}("id_entrega") VALUES($1) RETURNING id;`,
			values: [entrega.id]
		});
		idRealizarAvaliacao = res.rows[0].id;
		if (!idRealizarAvaliacao) throw new Error("'Realizar Avaliacao' não pode ser criado.");

		sql = `
				INSERT INTO ${DB_INFO.tables.avaliacao_criterio}(nota_atribuida, id_realizar_avaliacao, id_criterio)
				VALUES($1, $2, $3) 
				RETURNING id;`

		for (const criterio of criteriosAvaliados) {
			const model = new AvaliacaoCriterio({
				nota_atribuida: criterio.nota_atribuida,
				id_realizar_avaliacao: idRealizarAvaliacao,
				id_criterio: criterio.id
			});

			await db.query({
				text: sql,
				values: [
					model.nota_atribuida,
					model.id_realizar_avaliacao,
					model.id_criterio
				]
			});
		}

		return true;
	} catch (e) {
		throw new Error(`Erro ao avaliar entrega (${idEntrega}): ${e}`);
	}
}

export async function alteraAvaliacaoEntregaBD(idEntrega, criteriosAvaliados, idIntegrante) {
	try {
		const db = getPool();

		let res
		let sql
		let realizarAvaliacao

		// Verifica se a entrega existe para o id informado
		const entrega = await entregaController.buscaPorId(idEntrega);
		if (!entrega) {
			throw new Error(`Entrega ${idEntrega} não encontrada`);
		}

		// Prepara a query SQL
		if (idIntegrante == undefined) {
			sql = `
				UPDATE ${DB_INFO.tables.avaliacao_criterio}
				SET nota_atribuida = $1
				WHERE id_realizar_avaliacao = $2 AND id_criterio = $3 
				RETURNING id;`

			// Busca entrega correspondente
			realizarAvaliacao = await buscaAvaliacaoEntregaBD(idEntrega);
			if (!realizarAvaliacao) {
				throw new Error(`Erro ao alterar avaliação da entrega (${idEntrega}): Avaliação não encontrada`);
			}

			for (const criterio of criteriosAvaliados) {
				const idRealizarAvaliacao = realizarAvaliacao[0]?.id_realizar_avaliacao
				const idAvaliacaoCriterio = realizarAvaliacao[0]?.id_avaliacao_criterio

				console.log(`Alterando nota da avaliação ${idRealizarAvaliacao} id ${idAvaliacaoCriterio} no critério ${criterio.id} para ${criterio.nota_atribuida}`)
				const model = new AvaliacaoCriterio({
					id: idAvaliacaoCriterio,
					nota_atribuida: criterio.nota_atribuida,
					id_realizar_avaliacao: idRealizarAvaliacao,
					id_criterio: criterio.id
				});


				res = await db.query({
					text: sql,
					values: [
						model.nota_atribuida,
						model.id_realizar_avaliacao,
						model.id_criterio,
					]
				});
			}

			return true

		} else {
			sql = `
				UPDATE ${DB_INFO.tables.avaliacao_integrante_criterio}
				SET nota_atribuida = $1
				WHERE id_realizar_avaliacao = $2 AND id_criterio = $3 and id = $4
				RETURNING id;`

			// Busca entrega correspondente
			realizarAvaliacao = await buscaAvaliacaoEntregaIntegranteBD(idEntrega, idIntegrante);
			if (!realizarAvaliacao) {
				throw new Error(`Erro ao alterar avaliação da entrega (${idEntrega}): Avaliação não encontrada`);
			}


			for (const criterio of criteriosAvaliados) {
				let idRealizarAvaliacao
				let idAvaliacaoCriterio
				for (const avaliacao of realizarAvaliacao) {
					if (avaliacao.id_criterio == criterio.id) {
						idRealizarAvaliacao = avaliacao.id_realizar_avaliacao
						idAvaliacaoCriterio = avaliacao.id_avaliacao_criterio
					}
				}

				console.log(`Alterando nota da avaliação ${idRealizarAvaliacao} id ${idAvaliacaoCriterio} no critério ${criterio.id} para ${criterio.nota_atribuida}`)
				const model = new AvaliacaoCriterio({
					id: idAvaliacaoCriterio,
					nota_atribuida: criterio.nota_atribuida,
					id_realizar_avaliacao: idRealizarAvaliacao,
					id_criterio: criterio.id
				});


				res = await db.query({
					text: sql,
					values: [
						model.nota_atribuida,
						model.id_realizar_avaliacao,
						model.id_criterio,
						model.id
					]
				});
			}

			return true
		}

		// Altera as notas dos critérios
	} catch (e) {
		throw new Error(`Erro ao alterar avaliação da entrega (${idEntrega}): ${e}`);
	}
}

export async function buscaAvaliacaoEntregaBD(idEntrega) {
	const db = getPool();

	try {
		const query = {
			text: `
				SELECT 
					ra.id AS id_realizar_avaliacao,
					ra.id_entrega,
					ac.id AS id_avaliacao_criterio,
					ac.nota_atribuida,
					ac.id_criterio
				FROM ${DB_INFO.tables.realizar_avaliacao} ra
				LEFT JOIN ${DB_INFO.tables.avaliacao_criterio} ac
					ON ra.id = ac.id_realizar_avaliacao
				WHERE ra.id_entrega = $1;
			`,
			values: [idEntrega]
		};

		const res = await db.query(query);
		return res.rows;

	} catch (e) {
		throw new Error(`Erro ao buscar avaliação da entrega (${idEntrega}): ${e}`);
	}
}

export async function buscaAvaliacaoEntregaIntegranteBD(idEntrega, idIntegrante) {
	const db = getPool();

	try {
		const query = {
			text: `
				SELECT 
					ra.id AS id_realizar_avaliacao,
					ra.id_entrega,
					ac.id AS id_avaliacao_criterio,
					ac.nota_atribuida,
					ac.id_criterio
				FROM ${DB_INFO.tables.realizar_avaliacao} ra
				LEFT JOIN ${DB_INFO.tables.avaliacao_integrante_criterio} ac
					ON ra.id = ac.id_realizar_avaliacao
				WHERE ra.id_entrega = $1
					AND ac.id_estudante = $2;
			`,
			values: [idEntrega, idIntegrante]
		};

		const res = await db.query(query);
		return res.rows;

	} catch (e) {
		throw new Error(`Erro ao buscar avaliação da entrega (${idEntrega}) de integrante (${idIntegrante}): ${e}`);
	}
}

export async function avaliaIntegranteGrupoBD(idEntrega, idEstudante, criteriosAvaliados) {
	const db = getPool();

	try {
		// 1. Encontrar a avaliação principal ligada à entrega.
		const avaliacaoPrincipal = await buscaAvaliacaoEntregaBD(idEntrega);
		let idRealizarAvaliacao = avaliacaoPrincipal[0]?.id_realizar_avaliacao;

		if (!idRealizarAvaliacao) {
			const realizarAvaliacaoRes = await db.query({
				text: `INSERT INTO ${DB_INFO.tables.realizar_avaliacao}("id_entrega") VALUES($1) RETURNING id;`,
				values: [idEntrega]
			});
			idRealizarAvaliacao = realizarAvaliacaoRes.rows[0].id
		}

		// 2. Deletar notas antigas deste aluno para esta avaliação, para evitar duplicatas ou notas de critérios removidos.
		await db.query({
			text: `DELETE FROM ${DB_INFO.tables.avaliacao_integrante_criterio} WHERE id_realizar_avaliacao = $1 AND id_estudante = $2;`,
			values: [idRealizarAvaliacao, idEstudante]
		});

		// 3. Preparar o SQL para inserir as novas notas.
		const sql = `
            INSERT INTO ${DB_INFO.tables.avaliacao_integrante_criterio}
            (nota_atribuida, id_realizar_avaliacao, id_estudante, id_criterio)
            VALUES ($1, $2, $3, $4);
        `;

		// 4. Inserir a nota de cada critério para o estudante.
		for (const criterio of criteriosAvaliados) {
			const model = new AvaliacaoIntegranteCriterio({
				nota_atribuida: criterio.nota_atribuida,
				id_realizar_avaliacao: idRealizarAvaliacao,
				id_estudante: idEstudante,
				id_criterio: criterio.id
			});

			await db.query({
				text: sql,
				values: [
					model.nota_atribuida,
					model.id_realizar_avaliacao,
					model.id_estudante,
					model.id_criterio
				]
			});
		}

		return true;

	} catch (e) {
		throw new Error(`Erro ao avaliar o integrante ${idEstudante} na entrega ${idEntrega}: ${e.message}`);
	}
}


export async function buscaAvaliacaoIntegrantesBD(idEntrega) {
	const db = getPool();
	try {
		const query = {
			text: `
                SELECT 
                    aic.id_estudante,
                    aic.id_criterio,
                    aic.nota_atribuida
                FROM ${DB_INFO.tables.realizar_avaliacao} ra
                JOIN ${DB_INFO.tables.avaliacao_integrante_criterio} aic
                    ON ra.id = aic.id_realizar_avaliacao
                WHERE ra.id_entrega = $1;
            `,
			values: [idEntrega]
		};

		const res = await db.query(query);
		return res.rows; // Retorna um array de objetos {id_estudante, id_criterio, nota_atribuida}

	} catch (e) {
		throw new Error(`Erro ao buscar avaliação dos integrantes da entrega (${idEntrega}): ${e}`);
	}
}

export async function buscaPorEstudanteItemAtividadeBD(idEstudante, idItemAtividade) {
	const db = getPool();

	try {
		const query = {
			text: `
				SELECT 
					ra.id AS id_realizar_avaliacao,
					ra.id_entrega,
					ac.id AS id_avaliacao_criterio,
					ac.nota_atribuida,
					ac.id_criterio
				FROM ${DB_INFO.tables.realizar_avaliacao} ra
				LEFT JOIN ${DB_INFO.tables.avaliacao_criterio} ac
					ON ra.id = ac.id_realizar_avaliacao
				LEFT JOIN ${DB_INFO.tables.entrega} e
					ON ra.id_entrega = e.id
				LEFT JOIN ${DB_INFO.tables.item_atividade} ia
					ON ia.id = e.id_item_atividade
				WHERE e.id_estudante = $1
					AND e.id_item_atividade = $2
			`,
			values: [idEstudante, idItemAtividade]
		};

		const res = await db.query(query);
		return res.rows;

	} catch (e) {
		throw new Error(`Erro ao buscar avaliação do estudante ${idEstudante} no item ${idItemAtividade}: ${e}`);
	}
}
