import bcrypt from "bcryptjs"
import { loginDB, registerDB } from "../repositories/auth";

export async function registerNewUser(nome, login, password) {
	if (!nome && !login && !password) {
		return false
	}

	let salt = bcrypt.genSaltSync(10)
	let hash = bcrypt.hashSync(password, salt)
	try {
		let res = await registerDB(nome, login, hash, salt)

		if (res.rowCount > 0) {
			return true
		}
	} catch (e) {
		console.log(e);
	}
}

export async function loginUser(login, password) {
	if (!login && !password) {
		return false
	}

	const res = await loginDB(login, password)

	console.log(Boolean(res.rowCount))
	if (res.rowCount) {
		console.log("Logado com sucesso")
		return true
	}

	console.log("Login incorreto")
	return false

}
