import { comentar } from "$controllers/comentario";

/** 
 * Lista todas as instituições cadastradas no banco de dados
 */
export async function POST(event) {
	const body = await event.request.json();
	const comentario = body["comentario"]

	await comentar(comentario.idUsuario, comentario.idEntrega, comentario.texto, comentario.data, comentario.tipo);

	return new Response(JSON.stringify("funfou"))
}
