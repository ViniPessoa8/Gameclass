import bcrypt from "bcryptjs"
import { loginDB, registerDB } from "../repositories/auth";

export async function registerNewUser(dbConn, nome, login, password, id_instituicao, dt_nasc) {
	if (!dbConn && !nome && !login && !password) {
		return false
	}

	// TODO: verificar se já existe usuário com o mesmo login

	let salt = bcrypt.genSaltSync(10)
	let hash = bcrypt.hashSync(password, salt)
	try {
		let res = await registerDB(dbConn, nome, login, hash, salt, id_instituicao, dt_nasc)

		if (res.rowCount > 0) {
			return true
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function loginUser(dbConn, login, password) {
	if (!dbConn && !login && !password) {
		return false
	}

	try {
		const res = await loginDB(dbConn, login, password)
		if (res.rowCount) return res.rows[0]
		return false
	} catch (e) {
		console.log(e)
		throw e;
	}


}
