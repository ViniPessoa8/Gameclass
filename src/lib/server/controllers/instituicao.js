import { listaInstituicoesBD, buscaPorNomeBD, buscaPorIdBD } from "$repositories/instituicao"
import Instituicao from "../../models/Instituicao";

export default class InstituicaoController {
	async lista() {
		let res = await listaInstituicoesBD();

		if (res.rows.length > 0) {

			const instituicoes = res.rows.map((reg) => new Instituicao({ ...reg }))
			const dict = { "instituicoes": instituicoes }
			return dict
		} else {

			const instituicoes = []
			return instituicoes
		}

	}

	async buscaPorNome(nome) {
		let res = await buscaPorNomeBD(nome);
		if (res.rows.length > 0) {
			return new Instituicao({ ...res.rows[0] })
		}

		return false
	}

	async buscaPorId(id) {
		let res = await buscaPorIdBD(id);
		if (res.rows.length > 0) {
			return new Instituicao({ ...res.rows[0] })
		}

		return false
	}

}

