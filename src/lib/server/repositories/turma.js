
import { DB_INFO } from "../../constants";
import { dbConn } from "$config/database.js"

export async function registraTurmaBD(codigo, disciplina, nome, descricao, ano, periodo, local, instituicaoId, professorId, numero_alunos, cor) {
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.turma}(codigo, disciplina, nome, descricao, ano, periodo, local, id_instituicao, id_professor, numero_alunos, cor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;`,
		values: [codigo, disciplina, nome, descricao, ano, periodo, local, instituicaoId, professorId, numero_alunos, cor]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao registrar nova turma: ${e}`)
	}
}

export async function isTurmaRegisteredDB(codigo, instituicaoId) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.turma} WHERE codigo = $1 AND id_instituicao = $2;`,
		values: [codigo, instituicaoId]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por codigo (${codigo}) e instituicao (${instituicaoId})): ${e}`)
	}
}

export async function getTurmaByCodigoBD(codigo) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.turma} WHERE codigo = $1;`,
		values: [codigo]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por codigo (${codigo}): ${e}`)
	}
}

export async function getTurmasByIdProfessorBD(idProfessor) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.turma} WHERE id_professor = $1;`,
		values: [idProfessor]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por id do professor (${idProfessor}): ${e}`)
	}
}

export async function getTurmaByIdBD(id) {
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.turma} WHERE id = $1;`,
		values: [id]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por id (${id}): ${e}`)
	}
}

export async function deleteTurmaByCodigoBD(codigo) {
	const query = {
		text: `DELETE FROM ${DB_INFO.tables.turma} WHERE codigo = $1 RETURNING id;`,
		values: [codigo]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao deletar turma por codigo (${codigo}): ${e}`)
	}
}
