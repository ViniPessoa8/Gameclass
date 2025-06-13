import bcrypt from "bcryptjs";
import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function cadastraUsuarioBD(nome, login, hash, salt, id_instituicao, dt_nasc, bio, email, matricula_aluno, nivel, acumulo_XP, dataCriacao, ultimoAcesso, cor) {
	const db = getPool()
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.usuario}(nome, login, hash, salt, id_instituicao, dt_nasc, bio, email, matricula_aluno, nivel, acumulo_XP, data_criacao, ultimo_acesso, cor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`,
		values: [nome, login, hash, salt, id_instituicao, dt_nasc, bio, email, matricula_aluno, nivel, acumulo_XP, dataCriacao, ultimoAcesso, cor]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao registrar novo usuário: ${e}`)
	}
}

export async function loginDB(login, password) {
	const db = getPool()
	// Get salt from login
	const saltQuery = {
		text: `SELECT salt FROM ${DB_INFO.tables.usuario} WHERE login = $1`,
		values: [login]
	}

	try {
		const salt = await db.query(saltQuery)
		if (salt.rowCount == 0)
			return "User not found"

		const saltText = salt.rows[0].salt

		const hash = await bcrypt.hash(password, saltText)
		const query = {
			text: `SELECT * FROM ${DB_INFO.tables.usuario}\
					WHERE login = $1 and hash=$2`,
			values: [login, hash]
		}

		const res = await db.query(query)
		return res;
	} catch (e) {
		console.error(e)
	}
}

export async function findUserByLogin(login) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.usuario} WHERE login = $1`,
		values: [login]
	}

	try {
		const queryRes = await db.query(query)
		if (queryRes.rowCount > 0) {
			return queryRes.rows[0]
		} else {
			return false
		}
	} catch (e) {

	}
}

export async function removeUserByLoginDB(login) {
	const db = getPool()
	const query = {
		text: `DELETE FROM ${DB_INFO.tables.usuario} WHERE login = $1 RETURNING id`,
		values: [login]
	}

	try {
		const queryRes = await db.query(query)
		if (queryRes.rowCount > 0) {
			return true
		} else {
			return false
		}
	} catch (e) {

	}
}

