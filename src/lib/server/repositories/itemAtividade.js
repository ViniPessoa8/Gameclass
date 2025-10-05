import { getPool } from "$config/database.js"
import { DB_INFO } from "$lib/constants"

//INSERT

export async function cadastraItemAtividadeBD(titulo, descricao, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, tipoAvaliacaoNota, emGrupos, receberAposPrazo, idAtividade) {
	const db = getPool()
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.item_atividade}(titulo, descricao, nota_max, data_entrega_inicial, data_entrega_final, tipo_atribuicao_nota, tipo_avaliacao_nota, em_grupos, receber_apos_prazo, id_atividade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
		values: [titulo, descricao, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, tipoAvaliacaoNota, emGrupos, receberAposPrazo, idAtividade]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao cadastrar novo item da atividade (${idAtividade}): [${e.name} => ${e.message}`)
	}
}

// update

export async function alteraItemAtividadeBD(idItemAtividade, titulo, descricao, dataEntregaInicial, dataEntregaFinal) {
	const db = getPool()
	const query = {
		text: `UPDATE 
							${DB_INFO.tables.item_atividade} 
						SET 
							titulo = $2, descricao = $3, data_entrega_inicial = $4, data_entrega_final = $5
						WHERE
							id = $1
`,
		values: [idItemAtividade, titulo, descricao, dataEntregaInicial, dataEntregaFinal]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao alterar item da atividade (${idItemAtividade}): [${e.name} => ${e.message}`)
	}
}

// SELECT

export async function listaItensDaAtividadePorIdBD(idAtividadePai) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.item_atividade} WHERE id_atividade = $1 AND arquivado = FALSE`,
		values: [idAtividadePai]
	}

	try {
		const res = await db.query(query)
		return res.rows
	} catch (e) {
		throw (`Erro ao listar itens da atividade ${idAtividadePai}: ${e}`)
	}
}

export async function buscaItemAtividadePorIdBD(idItemAtividade) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.item_atividade} WHERE id = $1 `,
		values: [idItemAtividade]
	}

	try {
		const res = await db.query(query)
		return res.rows[0]
	} catch (e) {
		throw (`Erro ao buscar item de atividade, com id ${idItemAtividade}: ${e}`)
	}
}

export async function buscaItemAtividadePorTituloBD(titulo, idAtividadePai) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.item_atividade} WHERE titulo = $1 AND id_atividade = $2`,
		values: [titulo, idAtividadePai]
	}

	try {
		const res = await db.query(query)
		return res.rows[0]
	} catch (e) {
		throw (`Erro ao buscar item de atividade, com titulo ${titulo} na atividade (${idAtividadePai}): ${e}`)
	}
}

export async function listaCriteriosPorIdItemAtividadeBD(idItemAtividade) {
	const db = getPool()
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
		const res = await db.query(query)
		return res.rows
	} catch (e) {
		throw (`Erro ao buscar item de atividade, com id ${idItemAtividade}: ${e}`)
	}
}
// DELETE

export async function removeItemAtividadePorIdBD(idItemAtividade) {
	const db = getPool()
	const query = {
		text: `DELETE FROM ${DB_INFO.tables.item_atividade} WHERE id = $1 RETURNING id`,
		values: [idItemAtividade]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao remover item da atividade (${idItemAtividade}): ${e}`)
	}
}

export async function listaNotasDeCriteriosPorIdItemAtividadeBD(idItemAtividade) {
	const db = getPool()
	try {
		let query = {
			text: `
					SELECT
						c.*
					FROM 
						${DB_INFO.tables.criterio} c
					WHERE 
						c.id_item_atividade = $1
					;`,
			values: [idItemAtividade]
		}

		let res = await db.query(query)
		return res.rows

	} catch (e) {
		throw (`Erro ao listar notas de criterios por id do item da atividade (${idItemAtividade}): ${e}`)
	}
}

export async function possuiAvaliacoesPendentesBD(idItemAtividade) {
	const db = getPool()
	try {
		let query = {
			text: `
					select (select 
						COUNT(e.*) 
					from 
						public.item_atividade ia,
						public.entrega e
					where
						ia.id = $1
						and e.id_item_atividade = ia.id)
						-
					(select 
						COUNT(r.*)
					from 
						public.item_atividade ia,
						public.entrega e,
						public.realizar_avaliacao r 
					where
						ia.id = $1
						and e.id_item_atividade = ia.id
						and e.id = r.id_entrega 
					) as pendencias;
		`,
			values: [idItemAtividade]
		}

		let res = await db.query(query)
		return res.rows[0]

	} catch (e) {
		throw (`Erro ao listar notas de criteoriso por id do item da atividade (${idItemAtividade}): ${e}`)
	}

}

export async function arquivaItemAtividadePorIdBD(idItemAtividade) {
	const db = getPool()
	try {
		let query = {
			text: `
				UPDATE
					${DB_INFO.tables.item_atividade}
				SET
					arquivado = TRUE
				WHERE
					id = $1
		`,
			values: [idItemAtividade]
		}

		let res = await db.query(query)
		return res.rows[0]

	} catch (e) {
		throw (`Erro ao arquivar item da atividade (${idItemAtividade}): ${e}`)
	}

}
