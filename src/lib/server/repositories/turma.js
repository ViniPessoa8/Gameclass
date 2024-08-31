
import { DB_INFO } from "../../constants";
import { dbConn } from "$config/database.js"


export async function registraTurmaBD(codigo, disciplina, nome, ano, periodo, local, instituicaoId) {

	const query = {
		text: `INSERT INTO ${DB_INFO.turma_table}(codigo, disciplina, nome, ano, periodo, local, id_instituicao) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
		values: [codigo, disciplina, nome, ano, periodo, local, instituicaoId]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao registrar nova turma: ${e}`)
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
