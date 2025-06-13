
import { listaComentariosPorIdEntregaBD, comentarBD, listaComentariosPorIdPublicacaoMuralBD } from "../repositories/comentario"

export default class ComentarioController {

	async listaPorIdEntrega(idEntrega) {
		let res = await listaComentariosPorIdEntregaBD(idEntrega)
		return res.rows
	}

	async listaPorIdPublicacaoMural(idPublicacao) {
		let res = await listaComentariosPorIdPublicacaoMuralBD(idPublicacao)
		return res.rows
	}

	async comentaEntrega(idUsuario, idEntrega = null, textoComentario) {
		// async comentarEntrega(idUsuario, idEntrega = null, textoComentario) {
		await comentarBD(idUsuario, idEntrega, null, null, null, textoComentario)
	}

	async comentaPublicacao(idUsuario, idPublicacao = null, textoComentario) {
		// async comentarPublicacao(idUsuario, idPublicacao = null, textoComentario) {
		await comentarBD(idUsuario, null, idPublicacao, null, null, textoComentario)
	}

	async comentaItemAtividade(idUsuario, idItemAtividade = null, textoComentario) {
		// async comentarItemAtividade(idUsuario, idItemAtividade = null, textoComentario) {
		await comentarBD(idUsuario, null, null, idItemAtividade, null, textoComentario)
	}

	async comentaAvaliacao(idUsuario, idAvaliacao = null, textoComentario) {
		// async comentarAvaliacao(idUsuario, idAvaliacao = null, textoComentario) {
		await comentarBD(idUsuario, null, null, null, idAvaliacao, textoComentario)
	}
}
