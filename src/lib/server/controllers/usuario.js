import bcrypt from "bcryptjs"
import { buscarPorLoginBD, removerPorLoginBD, registrarBD, loginBD } from "../repositories/usuario";
import InstituicaoController from "./instituicao";
import { Usuario } from "../../models/Usuario";

const instituicaoController = new InstituicaoController()

export default class UsuarioController {
	async registrar(nome, login, password, instituicao, dtNasc, bio, email, matricula_aluno, cor) {
		if (!nome || !login || !password || !instituicao || !dtNasc || !email) {
			throw ("Dados obrigatórios não foram preenchidos.")
		}

		if (await this.buscarPorLogin(login)) {
			throw ("Já existe usuário com o mesmo login cadastrado.")
		}

		const instituicaoRes = await instituicaoController.buscarPorNome(instituicao);
		const idInstituicao = instituicaoRes.id
		const nivelInicial = 0
		const acumuloXpInicial = 0
		let dataCriacao = new Date()
		dataCriacao = dataCriacao.toISOString()
		let ultimoAcesso = dataCriacao
		let salt = bcrypt.genSaltSync(10)
		let hash = bcrypt.hashSync(password, salt)

		try {
			let res = await registrarBD(nome, login, hash, salt, idInstituicao, dtNasc, bio, email, matricula_aluno, nivelInicial, acumuloXpInicial, dataCriacao, ultimoAcesso, cor)

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

		if (!await this.buscarPorLogin(login)) {
			throw ("Usuário não cadastrado")
		}

		const res = await loginBD(login, password)

		if (res.rowCount) {
			return res.rows[0]
		}
		throw ("Login incorreto")
	}

	async removerPorLogin(login) {
		await removerPorLoginBD(login);
	}

	async buscarPorLogin(login) {
		const res = await buscarPorLoginBD(login);

		return new Usuario({ ...res });
	}

}
