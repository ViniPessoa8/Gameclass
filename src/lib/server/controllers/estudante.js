import { buscaEstudantePorIdBD, buscaEstudantePorIdGrupoBD, listaConquistasEstudantePorIdBD, listaConquistasEstudantePorIdTurmaBD } from "../repositories/estudante"

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

	async listaConquistasPorIdTurma(idEstudante, idTurma) {
		console.debug(`listaConquistasPorId(${idEstudante}, ${idTurma})`)
		let res = await listaConquistasEstudantePorIdTurmaBD(idEstudante, idTurma)

		return res.rows
	}
}

