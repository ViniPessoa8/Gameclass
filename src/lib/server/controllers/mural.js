import { getPublicacoesByIdTurmaBD } from "../repositories/mural"

export async function getPublicacoesByIdTurma(id_turma) {
	let res = await getPublicacoesByIdTurmaBD(id_turma)
	return res.rows
}
