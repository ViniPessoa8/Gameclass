
import { DB_INFO } from "../../constants";
import { dbConn } from "$config/database.js"


export async function registraTurmaBD(codigo, disciplina, nome, descricao, ano, periodo, local, instituicaoId, professorId) {

	const query = {
		text: `INSERT INTO ${DB_INFO.turma_table}(codigo, disciplina, nome, descricao, ano, periodo, local, id_instituicao, id_professor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`,
		values: [codigo, disciplina, nome, descricao, ano, periodo, local, instituicaoId, professorId]
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
		text: `SELECT * FROM ${DB_INFO.turma_table} WHERE codigo = $1 AND id_instituicao = $2;`,
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
		text: `SELECT * FROM ${DB_INFO.turma_table} WHERE codigo = $1;`,
		values: [codigo]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por codigo (${codigo}): ${e}`)
	}
}

export async function deleteTurmaByCodigoBD(codigo) {

	const query = {
		text: `DELETE FROM ${DB_INFO.turma_table} WHERE codigo = $1 RETURNING id;`,
		values: [codigo]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao deletar turma por codigo (${codigo}): ${e}`)
	}
}
