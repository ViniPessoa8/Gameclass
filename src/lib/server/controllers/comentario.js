
import { listaComentariosPorIdEntregaBD, comentarBD, listaComentariosPorIdPublicacaoMuralBD } from "../repositories/comentario"

export async function listaComentariosPorIdEntrega(idEntrega) {
	let res = await listaComentariosPorIdEntregaBD(idEntrega)
	return res.rows
}

export async function listaComentariosPorIdPublicacaoMural(idPublicacao) {
	let res = await listaComentariosPorIdPublicacaoMuralBD(idPublicacao)
	return res.rows
}

export async function comentarEntrega(idUsuario, idEntrega = null, textoComentario) {
	await comentarBD(idUsuario, idEntrega, null, null, null, textoComentario)
}

export async function comentarPublicacao(idUsuario, idPublicacao = null, textoComentario) {
	await comentarBD(idUsuario, null, idPublicacao, null, null, textoComentario)
}

export async function comentarItemAtividade(idUsuario, idItemAtividade = null, textoComentario) {
	await comentarBD(idUsuario, null, null, idItemAtividade, null, textoComentario)
}

export async function comentarAvaliacao(idUsuario, idAvaliacao = null, textoComentario) {
	await comentarBD(idUsuario, null, null, null, idAvaliacao, textoComentario)
}
