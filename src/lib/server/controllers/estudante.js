import { buscaEstudantePorIdBD } from "../repositories/estudante"

export default class EstudanteController {
	async buscaEstudantePorId(idEstudante) {
		let res = await buscaEstudantePorIdBD(idEstudante)

		return res.rows[0]
	}
}

