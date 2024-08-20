import bcrypt from "bcryptjs";
import { DB_INFO } from "../lib/constants";

export async function registerDB(dbConn, nome, login, hash, salt, id_instituicao, dt_nasc) {
	const query = {
		text: `INSERT INTO ${DB_INFO.auth_table}(nome, login, hash, salt, id_instituicao, dt_nasc) VALUES ($1, $2, $3, $4, $5, $6)`,
		values: [nome, login, hash, salt, id_instituicao, dt_nasc]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao registrar novo usuário: ${e}`)
	}
}

export async function loginDB(dbConn, login, password) {
	const saltQuery = {
		text: `SELECT salt FROM ${DB_INFO.auth_table} WHERE login = $1`,
		values: [login]
	}

	try {
		const salt = await dbConn.query(saltQuery)
		if (salt.rowCount == 0)
			return "User not found"

		const saltText = salt.rows[0].salt

		const hash = await bcrypt.hash(password, saltText)
		const query = {
			text: `SELECT * FROM ${DB_INFO.auth_table}\
					WHERE login = $1 and hash=$2`,
			values: [login, hash]
		}

		const res = await dbConn.query(query)
		return res;
	} catch (e) {
		console.error(e)
	}
}
