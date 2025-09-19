import { DB_INFO } from "$lib/constants";
import { getPool } from "$config/database.js"

export async function cadastraCriterioBD(titulo, descricao, pontuacao_max, peso, idItemAtividade) {
	const db = getPool()
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.criterio}(titulo, descricao, pontuacao_max, peso, id_item_atividade) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
		values: [titulo, descricao, pontuacao_max, peso, idItemAtividade]
	}

	const res = await db.query(query)
	return res
}

export async function buscaCriteriosPorIdItemAtividade(idItemAtividade) {
	const db = getPool()
	const query = {
		text: `SELECT FROM ${DB_INFO.tables.criterio} WHERE id_item_atividade = $1`,
		values: [idItemAtividade]
	}

	const res = await db.query(query)
	return res

}

export async function removeCriterioPorIdItemAtividadeBD(idItemAtividade) {
	const db = getPool()
	const query = {
		text: `DELETE FROM ${DB_INFO.tables.criterio} WHERE id_item_atividade = $1 `,
		values: [idItemAtividade]
	}

	const res = await db.query(query)
	return res
}

export async function listaCriteriosPorIdProfessorBD(idProfessor) {
	const db = getPool()
	const query = {
		text: `SELECT DISTINCT
							c.* 
						FROM 
							${DB_INFO.tables.criterio} c,
							${DB_INFO.tables.item_atividade} i,
							${DB_INFO.tables.atividade} a,
							${DB_INFO.tables.turma} t,
							${DB_INFO.tables.usuario} u
						WHERE 
							c.id_item_atividade = i.id 
							AND i.id_atividade = a.id 
							AND a.id_turma = t.id 
							AND t.id_professor = $1`,
		values: [idProfessor]
	}

	const res = await db.query(query)
	return res

}
