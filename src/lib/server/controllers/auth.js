import bcrypt from "bcryptjs"
import { loginDB, registerDB } from "$repositories/auth";
import { getInstituicaoByNome } from "./instituicao";

export async function registerNewUser(nome, login, password, instituicao, dtNasc) {
	if (!nome && !login && !password && !instituicao && !dtNasc) {
		return false
	}

	const id_instituicao = await getInstituicaoByNome(instituicao);
	// TODO: verificar se já existe usuário com o mesmo login

	let salt = bcrypt.genSaltSync(10)
	let hash = bcrypt.hashSync(password, salt)
	try {
		let res = await registerDB(nome, login, hash, salt, id_instituicao, dtNasc)

		if (res.rowCount > 0) {
			return true
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function loginUser(login, password) {
	if (!login && !password) {
		return false
	}

	const res = await loginDB(login, password)

	if (res.rowCount) {
		console.log("Logado com sucesso")
		return true
	}
}
