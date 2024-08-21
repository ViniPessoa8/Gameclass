import bcrypt from "bcryptjs"
import { loginDB, registerDB } from "../repositories/auth";
import { getInstituicaoByNome } from "./instituicao";

export async function registerNewUser(nome, login, password, instituicao, dtNasc) {
	if (!nome && !login && !password && !instituicao && !dtNasc) {
		return false
	}
	console.log("PASSOU")

	const id_instituicao = await getInstituicaoByNome(instituicao);
	// TODO: verificar se já existe usuário com o mesmo login

	console.log("PASSOU 2")
	let salt = bcrypt.genSaltSync(10)
	let hash = bcrypt.hashSync(password, salt)
	try {
		let res = await registerDB(nome, login, hash, salt, id_instituicao, dtNasc)
		console.log("PASSOU 3")

		if (res.rowCount > 0) {
			console.log("PASSOU 4")
			return true
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
	console.log("PASSOU 5")
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
}
