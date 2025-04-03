import bcrypt from "bcryptjs"
import { loginDB, registerDB } from "$repositories/auth";
import { getInstituicaoByNome } from "./instituicao";
import { findUserByLogin, removeUserByLoginDB } from "../repositories/auth";

export async function registerNewUser(nome, login, password, instituicao, dtNasc, bio, email, matricula_aluno, cor) {
	if (!nome || !login || !password || !instituicao || !dtNasc || !email) {
		throw ("Dados obrigatórios não foram preenchidos.")
	}

	if (await findUserByLogin(login)) {
		throw ("Já existe usuário com o mesmo login cadastrado.")
	}

	const instituicaoRes = await getInstituicaoByNome(instituicao);
	const idInstituicao = instituicaoRes.id
	const nivelInicial = 0
	const acumuloXpInicial = 0
	let dataCriacao = new Date()
	dataCriacao = dataCriacao.toISOString()
	let ultimoAcesso = dataCriacao
	let salt = bcrypt.genSaltSync(10)
	let hash = bcrypt.hashSync(password, salt)

	try {
		let res = await registerDB(nome, login, hash, salt, idInstituicao, dtNasc, bio, email, matricula_aluno, nivelInicial, acumuloXpInicial, dataCriacao, ultimoAcesso, cor)

		if (res.rowCount > 0) {
			return res.rows
		}
	} catch (e) {
		throw e;
	}
}

export async function removeUserByLogin(login) {
	removeUserByLoginDB(login);
}
export async function loginUser(login, password) {
	if (!login || !password) {
		throw ("Preencha o login e a senha")
	}

	if (!await findUserByLogin(login)) {
		throw ("Usuário não cadastrado")
	}

	const res = await loginDB(login, password)

	if (res.rowCount) {
		return res.rows[0]
	}
	throw ("Login incorreto")
}
