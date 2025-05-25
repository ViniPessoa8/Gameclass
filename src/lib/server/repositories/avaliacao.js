import { DB_INFO } from "../../constants.js";
import { getPool } from "$config/database.js";
import EntregaController from "../controllers/entrega.js";

import AvaliacaoCriterio from "$lib/models/AvaliacaoCriterio.js";

const entregaController = new EntregaController();

export async function avaliaEntregaBD(idEntrega, criteriosAvaliados) {
	const db = getPool();
	const entrega = await entregaController.buscarPorId(idEntrega);

	if (!entrega) {
		console.error(`Entrega ${idEntrega} não encontrada`);
		return false;
	}

	try {
		const res = await db.query({
			text: `INSERT INTO ${DB_INFO.tables.realizar_avaliacao}("id_entrega") VALUES($1) RETURNING id;`,
			values: [entrega.id]
		});

		const idRealizarAvaliacao = res.rows[0].id;

		for (const criterio of criteriosAvaliados) {
			const criterioRes = await db.query({
				text: `SELECT id FROM ${DB_INFO.tables.criterio} WHERE titulo = $1;`,
				values: [criterio.titulo]
			});
			if (!criterioRes.rows.length) continue;

			const idCriterio = criterioRes.rows[0].id;
			const model = new AvaliacaoCriterio({
				nota_atribuida: criterio.nota,
				id_realizar_avaliacao: idRealizarAvaliacao,
				id_criterio: idCriterio
			});

			await db.query({
				text: `
					INSERT INTO ${DB_INFO.tables.avaliacao_criterio}
					(nota_atribuida, id_realizar_avaliacao, id_criterio)
					VALUES ($1, $2, $3);
				`,
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

export async function alteraAvaliacaoEntregaBD(idEntrega, criteriosAvaliados) {
	const db = getPool();
	const entrega = await entregaController.buscarPorId(idEntrega);
	if (!entrega) {
		console.error(`Entrega ${idEntrega} não encontrada`);
		return false;
	}

	const realizarAvaliacao = await buscaAvaliacaoEntregaBD(idEntrega);
	const idRealizarAvaliacao = realizarAvaliacao[0]?.id_realizar_avaliacao;
	if (!idRealizarAvaliacao) return false;

	for (const criterio of criteriosAvaliados) {
		const criterioRes = await db.query({
			text: `
				SELECT id FROM ${DB_INFO.tables.criterio}
				WHERE titulo = $1 AND id_item_atividade = $2;
			`,
			values: [criterio[0], entrega.id_item_atividade]
		});

		if (!criterioRes.rows.length) continue;

		const idCriterio = criterioRes.rows[0].id;

		const model = new AvaliacaoCriterio({
			nota_atribuida: criterio[1],
			id_realizar_avaliacao: idRealizarAvaliacao,
			id_criterio: idCriterio
		});

		await db.query({
			text: `
				UPDATE ${DB_INFO.tables.avaliacao_criterio}
				SET nota_atribuida = $1
				WHERE id_criterio = $2 AND id_realizar_avaliacao = $3;
			`,
			values: [
				model.nota_atribuida,
				model.id_criterio,
				model.id_realizar_avaliacao
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
