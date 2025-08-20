import { getPool } from "$config/database.js"
import { DB_INFO } from "../../constants"

export async function cadastraAtividadeBD(titulo, descricao, prazo, id_turma) {
	const db = getPool()
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.atividade}(titulo, descricao, prazo, id_turma) VALUES ($1, $2, $3, $4) RETURNING id`,
		values: [titulo, descricao, prazo, id_turma]
	}

	const res = await db.query(query)
	return res
}

export async function atualizaAtividadeBD(id, titulo, descricao, prazo) {
	const db = getPool()
	const query = {
		text: `UPDATE ${DB_INFO.tables.atividade} 
					SET titulo = $2,
						descricao = $3,
						prazo = $4
					WHERE
						id = $1`,
		values: [id, titulo, descricao, prazo]
	}

	const res = await db.query(query)
	return res
}

export async function removeAtividadeBD(titulo, id_turma) {
	const db = getPool()
	const query = {
		text: `DELETE FROM ${DB_INFO.tables.atividade} WHERE titulo=$1 AND id_turma=$2`,
		values: [titulo, id_turma]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao remover atividade (${titulo}, ${id_turma}): ${e}`)
	}
}

export async function buscaPorIdBD(id) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.atividade} WHERE id=$1`,
		values: [id]
	}

	try {
		const res = await db.query(query)
		if (!res) {
			throw (`Não foi encontrada atividade com ID ${id}`)
		}
		return res
	} catch (e) {
		throw (`Erro ao buscar nova atividade por ID (${id}): ${e}`)
	}
}

// export async function getAtividadesByIdTurmaBD(idTurma) {
export async function listaPorIdTurmaBD(idTurma) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.atividade} WHERE id_turma=$1`,
		values: [idTurma]
	}

	try {
		const res = await db.query(query)
		if (!res) {
			throw (`Não foi encontrada atividade na turma com ID ${idTurma}`)
		}
		return res
	} catch (e) {
		throw (`Erro ao buscar atividade por ID da turma (${idTurma}): ${e}`)
	}
}

// export async function getAtividadeByTituloBD(titulo, id_turma) {
export async function buscaPorTituloBD(titulo, id_turma) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.atividade} WHERE titulo=$1 AND id_turma=$2`,
		values: [titulo, id_turma]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar nova atividade por titulo (${titulo}, id_turma: ${id_turma}): ${e}`)
	}
}
