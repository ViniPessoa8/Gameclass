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
	}
}

export async function loginUser(dbConn, login, password) {
	if (!dbConn && !login && !password) {
		return false
	}

	const res = await loginDB(dbConn, login, password)

	console.log(Boolean(res.rowCount))
	if (res.rowCount) {
		console.log("Logado com sucesso")

		console.log(res.rows)
		return true
	}

	console.log("Login incorreto")
	return false

}
