import { dbConn } from "$config/database.js"
import { DB_INFO } from "../../constants"

export async function cadastraAtividadeBD(titulo, descricao, prazo, id_turma) {
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.atividade}(titulo, descricao, prazo, id_turma) VALUES ($1, $2, $3, $4) RETURNING id`,
		values: [titulo, descricao, prazo, id_turma]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao cadastrar nova atividade: ${e}`)
	}
}

export async function removeAtividadeBD(titulo, id_turma) {
	const query = {
		text: `DELETE FROM ${DB_INFO.tables.atividade} WHERE titulo=$1 AND id_turma=$2`,
		values: [titulo, id_turma]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao cadastrar nova atividade: ${e}`)
	}
}

export async function getAtividadeByIdBD(id) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.atividade} WHERE id=$1`,
		values: [id]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar nova atividade por ID (${id}): ${e}`)
	}
}

export async function getAtividadeByTituloBD(titulo, id_turma) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.atividade} WHERE titulo=$1 AND id_turma=$2`,
		values: [titulo, id_turma]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar nova atividade por titulo (${titulo}, id_turma: ${id_turma}): ${e}`)
	}
}
