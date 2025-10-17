import { buscaEstudantePorIdBD, buscaEstudantePorIdGrupoBD, listaConquistasEstudantePorIdBD, listaConquistasEstudantePorIdTurmaBD } from "../repositories/estudante"
import { log } from "$lib/utils/logger"

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
		log(`listaConquistasPorId(${idEstudante})`)
		let res = await listaConquistasEstudantePorIdBD(idEstudante)

		return res.rows
	}

	async listaConquistasPorIdTurma(idEstudante, idTurma) {
		log(`listaConquistasPorId(${idEstudante}, ${idTurma})`)
		let res = await listaConquistasEstudantePorIdTurmaBD(idEstudante, idTurma)

		return res.rows
	}
}

