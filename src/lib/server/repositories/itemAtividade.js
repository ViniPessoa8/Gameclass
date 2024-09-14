import { dbConn } from "$config/database.js"
import { DB_INFO } from "../../constants"

export async function cadastraItemAtividadeBD(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividadePai) {
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.item_atividade}(titulo, nota_max, data_entrega_inicial, data_entrega_final, tipo_atribuicao_nota, em_grupos, receber_apos_prazo, n_integrantes_grupo, n_max_grupos, id_atividade_pai) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
		values: [titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividadePai]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao cadastrar novo item da atividade (${idAtividadePai}): ${e}`)
	}
}

export async function listaItensDaAtividadePorIdBD(idAtividadePai) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.item_atividade} WHERE id_atividade_pai = $1`,
		values: [idAtividadePai]
	}

	try {
		const res = await dbConn.query(query)
		return res.rows
	} catch (e) {
		throw (`Erro ao listar itens da atividade ${idAtividadePai}: ${e}`)
	}
}

export async function buscaItemAtividadePorIdBD(idItemAtividade) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.item_atividade} WHERE id = $1`,
		values: [idItemAtividade]
	}

	try {
		const res = await dbConn.query(query)
		return res.rows[0]
	} catch (e) {
		throw (`Erro ao buscar item de atividade, com id ${idItemAtividade}: ${e}`)
	}
}

export async function buscaItemAtividadePorTituloBD(titulo, idAtividadePai) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.item_atividade} WHERE titulo = $1 AND id_atividade_pai = $2`,
		values: [titulo, idAtividadePai]
	}

	try {
		const res = await dbConn.query(query)
		return res.rows[0]
	} catch (e) {
		throw (`Erro ao buscar item de atividade, com titulo ${titulo} na atividade (${idAtividadePai}): ${e}`)
	}
}

export async function removeItemAtividadePorIdBD(idItemAtividade) {
	const query = {
		text: `DELETE FROM ${DB_INFO.tables.item_atividade} WHERE id = $1 RETURNING id`,
		values: [idItemAtividade]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao remover item da atividade (${idItemAtividade}): ${e}`)
	}
}

