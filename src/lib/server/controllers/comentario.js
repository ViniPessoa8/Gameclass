
import { listaComentariosPorIdEntregaBD, comentarBD, listaComentariosPorIdPublicacaoMuralBD } from "../repositories/comentario"

export async function listaComentariosPorIdEntrega(idEntrega) {
	let res = await listaComentariosPorIdEntregaBD(idEntrega)
	return res.rows
}

export async function listaComentariosPorIdPublicacaoMural(idPublicacao) {
	let res = await listaComentariosPorIdPublicacaoMuralBD(idPublicacao)
	return res.rows
}

export async function comentar(idUsuario, idEntrega = null, textoComentario, dataCriacao, tipo) {
	await comentarBD(idUsuario, idEntrega, textoComentario, dataCriacao, tipo)
}
