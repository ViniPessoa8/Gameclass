import { dbConn } from "$config/database.js"
import { DB_INFO } from "../../constants"

export async function cadastraTagBD(titulo, cor, idProfessor) {
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.tag}(titulo, cor, id_professor) VALUES ($1, $2, $3)`,
		values: [titulo, cor, idProfessor]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao criar nova tag (${titulo}, ${idProfessor}): ${e}`)
	}
}

export async function listaTagsProfessorBD(idProfessor) {
	const query = {
		text: `SELECT * FROM tag WHERE id_professor = $1`,
		values: [idProfessor]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar tags de professor (${idProfessor}): ${e}`)
	}
}

export async function deletaTagBD(titulo, idProfessor) {
	const query = {
		text: `DELETE FROM tag WHERE titulo = $1 AND id_professor = $2`,
		values: [titulo, idProfessor]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao deletar tag de professor (${idProfessor}): ${e}`)
	}
}
