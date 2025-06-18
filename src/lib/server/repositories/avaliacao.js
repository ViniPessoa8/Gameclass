import { DB_INFO } from "../../constants.js";
import { getPool } from "$config/database.js";
import EntregaController from "../controllers/entrega.js";

import AvaliacaoCriterio from "$lib/models/AvaliacaoCriterio.js";

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
