import { DB_INFO } from "../../constants.js";
import { getPool } from "$config/database.js";
import EntregaController from "../controllers/entrega.js";

import AvaliacaoCriterio from "$lib/models/AvaliacaoCriterio.js";
import AvaliacaoIntegranteCriterio from "$lib/models/AvaliacaoIntegranteCriterio.js";

const entregaController = new EntregaController();

export async function avaliaEntregaBD(idEntrega, criteriosAvaliados) {

	try {
		return await cadastraOuAlteraNotas(idEntrega, criteriosAvaliados, 0)
	} catch (e) {
		throw new Error(`Erro ao avaliar entrega (${idEntrega}): ${e}`);
	}
}

export async function alteraAvaliacaoEntregaBD(idEntrega, criteriosAvaliados) {
	try {
		return await cadastraOuAlteraNotas(idEntrega, criteriosAvaliados, 1)
	} catch (e) {
		throw new Error(`Erro ao alterar avaliação da entrega (${idEntrega}): ${e}`);
	}
}

// tipo 0 = Cadastrar
// tipo 1 = Alterar
async function cadastraOuAlteraNotas(idEntrega, criteriosAvaliados, tipo = 0) {
	const db = getPool();
	const entrega = await entregaController.buscaPorId(idEntrega);

	if (!entrega) {
		throw new Error(`Entrega ${idEntrega} não encontrada`);
	}

	let idRealizarAvaliacao
	let sql
	if (tipo == 0) {
		sql = `
				INSERT INTO ${DB_INFO.tables.avaliacao_criterio}
				(nota_atribuida, id_realizar_avaliacao, id_criterio)
				VALUES ($1, $2, $3);
			`
		const res = await db.query({
			text: `INSERT INTO ${DB_INFO.tables.realizar_avaliacao}("id_entrega") VALUES($1) RETURNING id;`,
			values: [entrega.id]
		});
		idRealizarAvaliacao = res.rows[0].id;

	} else {
		sql = `
				UPDATE ${DB_INFO.tables.avaliacao_criterio}
				SET nota_atribuida = $1
				WHERE id_realizar_avaliacao = $2 AND id_criterio = $3;
			`
		const realizarAvaliacao = await buscaAvaliacaoEntregaBD(idEntrega);
		idRealizarAvaliacao = realizarAvaliacao[0]?.id_realizar_avaliacao;
	}

	if (!idRealizarAvaliacao) throw new Error("'Realizar Avaliacao' não pode ser criado.");

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

// --- NOVAS FUNÇÕES PARA AVALIAÇÃO INDIVIDUAL DO INTEGRANTE ---

/**
 * Cadastra ou altera a avaliação específica de um integrante de grupo.
 * Presume-se que a avaliação geral da entrega (realizar_avaliacao) já foi criada.
 *
 * @param {number} idEntrega O ID da entrega do grupo.
 * @param {number} idEstudante O ID do estudante a ser avaliado.
 * @param {Array<{id: number, nota_atribuida: number}>} criteriosAvaliados Array com critérios e notas individuais.
 */
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
		//    Isso transforma a função em um "salvar" (cria se não existe, substitui se existe).
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


/**
 * Busca as notas individuais de todos os integrantes para uma dada avaliação.
 *
 * @param {number} idEntrega O ID da entrega do grupo.
 */
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
