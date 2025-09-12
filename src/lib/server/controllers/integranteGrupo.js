import { cadastraIntegranteEmGrupoBD, listaPorIdGrupoBD } from "../repositories/integranteGrupo"

export default class IntegranteGrupoController {
	async cadastra(idEstudante, idGrupo) {
		await cadastraIntegranteEmGrupoBD(idEstudante, idGrupo)
	}

	async listaPorIdGrupo(idGrupo) {
		let res = await listaPorIdGrupoBD(idGrupo)
		return res.rows
	}

}

