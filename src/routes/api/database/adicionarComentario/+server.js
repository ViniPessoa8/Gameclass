import { comentar } from "$lib/server/controllers/comentario";

export async function POST(event) {
	const body = await event.request.json();
	const comentario = body["comentario"]
	console.debug(comentario)

	await comentar(comentario.idUsuario, comentario.idEntrega, comentario.texto, comentario.data, comentario.tipo);

	return new Response(JSON.stringify("funfou"))
}
