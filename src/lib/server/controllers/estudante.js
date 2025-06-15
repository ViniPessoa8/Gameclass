import { buscaEstudantePorIdBD } from "../repositories/estudante"

export default class EstudanteController {
	async buscaPorId(idEstudante) {
		let res = await buscaEstudantePorIdBD(idEstudante)

		return res.rows[0]
	}
}

