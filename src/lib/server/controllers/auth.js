import bcrypt from "bcryptjs"
import { loginDB, registerDB } from "$repositories/auth";
import { getInstituicaoByNome } from "./instituicao";
import { findUserByLogin } from "../repositories/auth";

export async function registerNewUser(nome, login, password, instituicao, dtNasc) {
	if (!nome && !login && !password && !instituicao && !dtNasc) {
		return false
	}

	const instituicaoRes = await getInstituicaoByNome(instituicao);
	const id_instituicao = instituicaoRes.id

	// TODO: verificar se já existe usuário com o mesmo login
	if (await findUserByLogin(login)) {
		throw ("Já existe usuário com o mesmo login cadastrado.")
	}

	let salt = bcrypt.genSaltSync(10)
	let hash = bcrypt.hashSync(password, salt)
	try {
		let res = await registerDB(nome, login, hash, salt, id_instituicao, dtNasc)

		if (res.rowCount > 0) {
			return true
		}
	} catch (e) {
		throw e;
	}
}

export async function loginUser(login, password) {
	if (!login && !password) {
		return false
	}

	// TODO: verificar se já existe usuário com o mesmo login
	console.log(await findUserByLogin(login))
	if (!await findUserByLogin(login)) {
		throw ("Usuário não cadastrado")
	}

	const res = await loginDB(login, password)

	if (res.rowCount) {
		console.log("Logado com sucesso")
		return res.rows[0]
	}
}
