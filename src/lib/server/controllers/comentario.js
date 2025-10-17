import { listaComentariosPorIdEntregaBD, comentaBD, listaComentariosPorIdPublicacaoMuralBD } from "../repositories/comentario"
import { log, info, error, debug } from "$lib/utils/logger"

export default class ComentarioController {

	async listaPorIdEntrega(idEntrega) {
		log(`ComentarioController -> listaPorIdEntrega(${idEntrega})`)
		let res = await listaComentariosPorIdEntregaBD(idEntrega)
		return res.rows
	}

	async listaPorIdPublicacaoMural(idPublicacao) {
		log(`ComentarioController -> listaPorIdPublicacaoMural(${idPublicacao})`)
		let res = await listaComentariosPorIdPublicacaoMuralBD(idPublicacao)
		return res.rows
	}

	async comentaEntrega(idUsuario, idEntrega = null, textoComentario) {
		log(`ComentarioController -> comentaEntrega(${idUsuario}, ${idEntrega}, ${textoComentario})`)
		await comentaBD(idUsuario, idEntrega, null, null, null, textoComentario)
	}

	async comentaPublicacao(idUsuario, idPublicacao = null, textoComentario) {
		log(`ComentarioController -> comentaPublicacao(${idUsuario}, ${idPublicacao}, ${textoComentario})`)
		await comentaBD(idUsuario, null, idPublicacao, null, null, textoComentario)
	}

	async comentaItemAtividade(idUsuario, idItemAtividade = null, textoComentario) {
		log(`ComentarioController -> comentaItemAtividade(${idUsuario}, ${idItemAtividade}, ${textoComentario})`)
		await comentaBD(idUsuario, null, null, idItemAtividade, null, textoComentario)
	}

	async comentaAvaliacao(idUsuario, idAvaliacao = null, textoComentario) {
		log(`ComentarioController -> comentaAvaliacao(${idUsuario}, ${idAvaliacao}, ${textoComentario})`)
		await comentaBD(idUsuario, null, null, null, idAvaliacao, textoComentario)
	}
}
