import { dbConn } from "$config/database.js"
import { DB_INFO } from "$lib/constants"

//INSERT

export async function cadastraItemAtividadeBD(titulo, descricao, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividade, status) {
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.item_atividade}(titulo, descricao, nota_max, data_entrega_inicial, data_entrega_final, tipo_atribuicao_nota, em_grupos, receber_apos_prazo, n_integrantes_grupo, n_max_grupos, id_atividade, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
		values: [titulo, descricao, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividade, status]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao cadastrar novo item da atividade (${idAtividade}): ${e}`)
	}
}

// SELECT

export async function listaItensDaAtividadePorIdBD(idAtividadePai) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.item_atividade} WHERE id_atividade = $1`,
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
		text: `SELECT * FROM ${DB_INFO.tables.item_atividade} WHERE id = $1 `,
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
		text: `SELECT * FROM ${DB_INFO.tables.item_atividade} WHERE titulo = $1 AND id_atividade = $2`,
		values: [titulo, idAtividadePai]
	}

	try {
		const res = await dbConn.query(query)
		return res.rows[0]
	} catch (e) {
		throw (`Erro ao buscar item de atividade, com titulo ${titulo} na atividade (${idAtividadePai}): ${e}`)
	}
}

export async function listaCriteriosPorIdItemAtividadeBD(idItemAtividade) {
	const query = {
		text: `SELECT 
					c.* 
				FROM 
					${DB_INFO.tables.item_atividade} ia,
					${DB_INFO.tables.criterio} c
				WHERE ia.id = $1
				AND c.id_item_atividade = ia.id`,
		values: [idItemAtividade]
	}

	try {
		const res = await dbConn.query(query)
		return res.rows
	} catch (e) {
		throw (`Erro ao buscar item de atividade, com id ${idItemAtividade}: ${e}`)
	}
}
// DELETE

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

// listaNotasDeCriteriosPorIdItemAtividadeBD
export async function listaNotasDeCriteriosPorIdItemAtividadeBD(idItemAtividade) {
	try {
		let query = {
			text: `	c.*
					FROM 
						${DB_INFO.tables.criterio} c
					WHERE 
						AND c.id_item_atividade = $1
					;`,
			values: [idItemAtividade]
		}

		let res = await dbConn.query(query)
		return res.rows

	} catch (e) {
		throw (`Erro ao listar notas de criteoriso por id do item da atividade (${idItemAtividade}): ${e}`)
	}
}
