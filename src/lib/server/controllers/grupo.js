import { listaGruposPorIdItemAtividadeBD, buscaGrupoPorIdBD } from "../repositories/grupo"

export default class GrupoController {
	async listaPorIdItemAtividade(idItemAtividade) {
		let res = await listaGruposPorIdItemAtividadeBD(idItemAtividade)
		return res.rows
	}

	async buscaPorId(idGrupo) {
		let res = await buscaGrupoPorIdBD(idGrupo)
		return res.rows[0]
	}

}

