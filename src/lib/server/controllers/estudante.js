import { buscaEstudantePorIdBD, buscaEstudantePorIdGrupoBD, listaConquistasEstudantePorIdBD } from "../repositories/estudante"

export default class EstudanteController {
	async buscaPorId(idEstudante) {
		let res = await buscaEstudantePorIdBD(idEstudante)

		return res.rows[0]
	}

	async buscaPorIdGrupo(idGrupo) {
		let res = await buscaEstudantePorIdGrupoBD(idGrupo)

		return res.rows
	}

	async listaConquistasPorId(idEstudante) {
		console.debug(`listaConquistasPorId(${idEstudante})`)
		let res = await listaConquistasEstudantePorIdBD(idEstudante)

		return res.rows
	}
}

