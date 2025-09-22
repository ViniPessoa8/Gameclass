import bcrypt from "bcryptjs"
import { buscaPorLoginBD, removePorLoginBD, registraUsuarioBD, loginBD } from "../repositories/usuario";
import InstituicaoController from "./instituicao";
import { Usuario } from "../../models/Usuario";

const instituicaoController = new InstituicaoController()

export default class UsuarioController {
	async registra(nome, login, password, dtNasc, bio, email, cor) {
		console.debug(nome, login, password, dtNasc, bio, email, cor)
		if (!nome || !login || !password || !dtNasc || !email) {
			throw ("Dados obrigatórios não foram preenchidos.")
		}

		let existeLogin = await this.buscaPorLogin(login)
		console.debug("existeLogin => ", existeLogin)
		if (existeLogin) {
			throw ("Já existe usuário com o mesmo login cadastrado.")
		}

		const nivelInicial = 0
		const acumuloXpInicial = 0
		let dataCriacao = new Date()
		dataCriacao = dataCriacao.toISOString()
		let ultimoAcesso = dataCriacao
		let salt = bcrypt.genSaltSync(10)
		let hash = bcrypt.hashSync(password, salt)

		try {
			let res = await registraUsuarioBD(nome, login, hash, salt, dtNasc, bio, email, nivelInicial, acumuloXpInicial, dataCriacao, ultimoAcesso, cor)

			if (res.rowCount > 0) {
				return res.rows
			}
		} catch (e) {
			throw e;
		}
	}

	async login(login, password) {
		if (!login || !password) {
			throw ("Preencha o login e a senha")
		}

		if (!await this.buscaPorLogin(login)) {
			throw ("Usuário não cadastrado")
		}

		const res = await loginBD(login, password)

		if (res.rowCount) {
			return res.rows[0]
		}
		throw ("Login incorreto")
	}

	async removerPorLogin(login) {
		await removePorLoginBD(login);
	}

	async buscaPorLogin(login) {
		const res = await buscaPorLoginBD(login);

		return res ? new Usuario({ ...res }) : res
	}

}
