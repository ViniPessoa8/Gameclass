import { listaRankingPorIdTurmaBD } from "../repositories/ranking"

export async function listaRankingPorIdTurma(idTurma) {
	let res = await listaRankingPorIdTurmaBD(idTurma)
	return res.rows
}
