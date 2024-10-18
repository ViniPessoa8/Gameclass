import { DB_INFO } from "$lib/constants";
import { dbConn } from "$config/database.js"

export async function cadastraCriterioBD(titulo, nota_max, peso, idItemAtividade) {
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.criterio}(titulo, nota_max, peso, id_item_atividade) VALUES ($1, $2, $3, $4) RETURNING id`,
		values: [titulo, nota_max, peso, idItemAtividade]
	}

	const res = await dbConn.query(query)
	return res
}

export async function buscaCriteriosPorIdItemAtividade(idItemAtividade) {
	const query = {
		text: `SELECT FROM ${DB_INFO.tables.criterio} WHERE id_item_atividade = $1`,
		values: [idItemAtividade]
	}

	const res = await dbConn.query(query)
	return res

}

export async function removeCriterioPorIdItemAtividadeBD(idItemAtividade) {
	const query = {
		text: `DELETE FROM ${DB_INFO.tables.criterio} WHERE id_item_atividade = $1 `,
		values: [idItemAtividade]
	}

	const res = await dbConn.query(query)
	return res
}
