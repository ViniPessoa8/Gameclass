import { listaGruposPorIdItemAtividadeBD, buscaGrupoPorIdBD, cadastraBD } from "../repositories/grupo"
import { log } from "$lib/utils/logger"

export default class GrupoController {
	async cadastra(nome, idItemAtividade) {
		log(`GrupoController -> cadastra(${nome}, ${idItemAtividade})`)
		return await cadastraBD(nome, idItemAtividade)
	}

	async listaPorIdItemAtividade(idItemAtividade) {
		log(`GrupoController -> listaPorIdItemAtividade(${idItemAtividade})`)
		let res = await listaGruposPorIdItemAtividadeBD(idItemAtividade)
		return res.rows
	}

	async buscaPorId(idGrupo) {
		log(`GrupoController -> buscaPorId(${idGrupo})`)
		let res = await buscaGrupoPorIdBD(idGrupo)
		return res.rows[0]
	}

}

