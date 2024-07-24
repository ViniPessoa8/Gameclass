import bcrypt from "bcryptjs";
import { DB_INFO } from "../lib/constants";

export async function registerDB(dbConn, name, login, hash, salt) {
	const query = {
		text: `INSERT INTO ${DB_INFO.auth_table}(name, login, hash, salt) VALUES ($1, $2, $3, $4)`,
		values: [name, login, hash, salt]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao registrar novo usuário: ${e}`)
	}
}

export async function loginDB(dbConn, login, password) {
	// TODO: verificar se hash é equivalente à vinda do banco de dados

	// Get salt from login
	const saltQuery = {
		text: `SELECT salt FROM ${DB_INFO.auth_table}\
				WHERE login = $1`,
		values: [login]
	}

	try {
		const salt = await dbConn.query(saltQuery)
		// TODO: check if salt is on db
		console.log(salt, typeof salt)
		if (salt.rowCount == 0)
			return "User not found"

		const saltText = salt.rows[0].salt

		const hash = await bcrypt.hash(password, saltText)
		const query = {
			text: `SELECT login, hash, salt FROM ${DB_INFO.auth_table}\
					WHERE login = $1 and hash=$2`,
			values: [login, hash]
		}

		const res = await dbConn.query(query)
		return res;
	} catch (e) {
		console.error(e)
	}



}
