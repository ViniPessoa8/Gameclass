
import { DB_INFO } from "../../constants";
import { dbConn } from "$config/database.js"

export async function listaEntregasPorItemAtividadeIdBD(idItemAtividade) {
	const query = {
		text: `	SELECT 
					ent.*
 				FROM 
					${DB_INFO.tables.item_atividade} ia,
					${DB_INFO.tables.entrega} ent,
					${DB_INFO.tables.estudante} est
				WHERE 
					ia.id = ent.id_item_atividade
					AND est.id = ent.id_estudante
					AND ia.id = $1;`,
		values: [idItemAtividade]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar entregas por por id do item atividade (${idItemAtividade}): ${e}`)
	}
}

export async function buscaEntregaPorIdBD(idEntrega) {
	const query = {
		text: `	SELECT 
					*
 				FROM 
					${DB_INFO.tables.entrega}
				WHERE 
					id = $1;`,
		values: [idEntrega]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar entrega por id (${idEntrega}): ${e}`)
	}
}

export async function avaliaEntregaBD(idEntrega, notas) {
	const entregaResult = await buscaEntregaPorIdBD(idEntrega)

	if (!entregaResult.rows.length) {
		console.error(`Entrega ${idEntrega} não encontrada`)
		return false
	}

	const entrega = entregaResult.rows[0]

	try {
		let query = {
			text: `	INSERT INTO ${DB_INFO.tables.realizar_avaliacao}("id_entrega")
					VALUES($1)
					RETURNING id;`,
			values: [entrega.id]
		}


		let res = await dbConn.query(query)
		const idRealizarAvaliacao = res.rows[0].id

		for (const avaliacao of notas) {
			const [tituloCriterio, nota] = avaliacao

			query = {
				text: `	SELECT id
						FROM ${DB_INFO.tables.criterio} 
						WHERE titulo = $1;`,
				values: [tituloCriterio]
			}

			const criterioRes = await dbConn.query(query)
			if (!criterioRes.rows.length) {
				console.warn(`Critério "${tituloCriterio}" não encontrado. Pulando.`)
				continue
			}
			const idCriterio = criterioRes.rows[0].id

			query = {
				text: `	INSERT INTO
							${DB_INFO.tables.avaliacao_criterio} ("nota_atribuida", "id_realizar_avaliacao", "id_criterio")
						VALUES(
							$1, $2, $3
						);`,
				values: [nota, idRealizarAvaliacao, idCriterio]
			}

			res = await dbConn.query(query)
		}

	} catch (e) {
		throw (`Erro ao avaliar entrega (${idEntrega}): ${e}`)
	}

	return true
}

export async function buscaAvaliacaoEntregaBD(idEntrega) {
	try {
		let query = {
			text: `	SELECT *
					FROM ${DB_INFO.tables.realizar_avaliacao}
					WHERE id_entrega = $1
					;`,
			values: [idEntrega]
		}

		let res = await dbConn.query(query)
		return res.rows

	} catch (e) {
		throw (`Erro ao avaliar entrega (${idEntrega}): ${e}`)
	}
}


