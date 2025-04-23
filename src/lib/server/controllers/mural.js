import { criaPublicacaoBD, getPublicacoesByIdTurmaBD } from "../repositories/mural"

export async function getPublicacoesByIdTurma(idTurma) {
	let res = await getPublicacoesByIdTurmaBD(idTurma)
	return res.rows
}

export async function criaPublicacao(idTurma, idUsuario, textoPublicacao) {
	let res = await criaPublicacaoBD(idTurma, idUsuario, textoPublicacao)
	return res.rows
}
