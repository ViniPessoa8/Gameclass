import { listaGruposPorIdItemAtividadeBD, buscaGrupoPorIdBD, cadastraBD } from "../repositories/grupo"

export default class GrupoController {
	async cadastra(nome, idItemAtividade) {
		return await cadastraBD(nome, idItemAtividade)
	}

	async listaPorIdItemAtividade(idItemAtividade) {
		let res = await listaGruposPorIdItemAtividadeBD(idItemAtividade)
		return res.rows
	}

	async buscaPorId(idGrupo) {
		let res = await buscaGrupoPorIdBD(idGrupo)
		return res.rows[0]
	}

}

