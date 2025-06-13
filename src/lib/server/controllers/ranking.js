import { listaRankingPorIdTurmaBD } from "../repositories/ranking"

export default class RankingController {
	async listaRankingPorIdTurma(idTurma) {
		let res = await listaRankingPorIdTurmaBD(idTurma)
		return res.rows
	}
}
