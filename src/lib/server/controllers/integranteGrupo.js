import { cadastraIntegranteEmGrupoBD, listaPorIdGrupoBD } from "../repositories/integranteGrupo"
import { log } from "$lib/utils/logger"

export default class IntegranteGrupoController {
	async cadastra(idEstudante, idGrupo) {
		log(`IntegranteGrupoController -> cadastra(${idEstudante}, ${idGrupo})`)

		await cadastraIntegranteEmGrupoBD(idEstudante, idGrupo)
	}

	async listaPorIdGrupo(idGrupo) {
		log(`IntegranteGrupoController -> listaPorIdGrupo(${idGrupo})`)

		let res = await listaPorIdGrupoBD(idGrupo)
		return res.rows
	}

}

