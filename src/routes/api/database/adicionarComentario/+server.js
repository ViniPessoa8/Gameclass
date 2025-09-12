import { comentaEntrega, comentaPublicacao, comentaItemAtividade, comentaAtividade } from "$lib/server/controllers/comentario";
import ComentarioController from "$lib/server/controllers/comentario";

const comentarioController = new ComentarioController()

export async function POST(event) {
	const body = await event.request.json();
	const comentario = body["comentario"]

	if (comentario.idEntrega != undefined) {
		await comentarioController.comentaEntrega(comentario.idUsuario, comentario.idEntrega, comentario.texto)
	}

	if (comentario.idPublicacao != undefined) {
		await comentarioController.comentaPublicacao(comentario.idUsuario, comentario.idPublicacao, comentario.texto)
	}

	if (comentario.idItemAtividade != undefined) {
		await comentarioController.comentaItemAtividade(comentario.idUsuario, comentario.idItemAtividade, comentario.texto)
	}

	if (comentario.idAtividade != undefined) {
		await comentarioController.comentaAtividade(comentario.idUsuario, comentario.idAtividade, comentario.texto)
	}

	// await comentar(comentario.idUsuario, comentario.idEntrega, comentario.texto, comentario.data, comentario.tipo);

	return new Response(JSON.stringify("funfou"))
}
