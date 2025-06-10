import { listaGruposPorIdItemAtividadeBD } from "../repositories/grupo"

export default class GrupoController {
	async listaGruposPorIdItemAtividade(idItemAtividade) {
		let res = await listaGruposPorIdItemAtividadeBD(idItemAtividade)
		return res.rows
	}

}

