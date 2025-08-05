import { cadastraIntegranteEmGrupoBD, listaIntegrantesPorIdGrupo } from "../repositories/integranteGrupo"

export default class IntegranteGrupoController {
	async cadastra(idEstudante, idGrupo) {
		await cadastraIntegranteEmGrupoBD(idEstudante, idGrupo)
	}

	async listaPorIdGrupo(idGrupo) {
		let res = await listaIntegrantesPorIdGrupo(idGrupo)
		return res.rows
	}

}

