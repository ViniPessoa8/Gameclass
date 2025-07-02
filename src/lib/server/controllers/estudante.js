import { buscaEstudantePorIdBD, buscaEstudantePorIdGrupoBD } from "../repositories/estudante"

export default class EstudanteController {
	async buscaPorId(idEstudante) {
		let res = await buscaEstudantePorIdBD(idEstudante)

		return res.rows[0]
	}

	async buscaPorIdGrupo(idGrupo) {
		let res = await buscaEstudantePorIdGrupoBD(idGrupo)

		return res.rows
	}
}

