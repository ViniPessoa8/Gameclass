import { listarBD, buscarPorNomeBD, buscarPorIdBD } from "$repositories/instituicao"
import Instituicao from "../../models/Instituicao";

export default class InstituicaoController {
	async listar() {
		let res = await listarBD();

		if (res.rows.length > 0) {

			const instituicoes = res.rows.map((reg) => new Instituicao({ ...reg }))
			const dict = { "instituicoes": instituicoes }
			return dict
		} else {

			const instituicoes = []
			return instituicoes
		}

	}

	async buscarPorNome(nome) {
		let res = await buscarPorNomeBD(nome);
		if (res.rows.length > 0) {
			return new Instituicao({ ...res.rows[0] })
		}

		return false
	}

	async buscarPorId(id) {
		let res = await buscarPorIdBD(id);
		if (res.rows.length > 0) {
			return new Instituicao({ ...res.rows[0] })
		}

		return false
	}

}

