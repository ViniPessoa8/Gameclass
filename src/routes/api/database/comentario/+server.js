import { listaComentariosPorIdEntrega } from "$controllers/comentario";
import ComentarioController from "$lib/server/controllers/comentario";

const controllerComentario = new ComentarioController()

export async function POST(event) {
	const body = await event.request.json();
	const idEntrega = body["idEntrega"]

	const res = await controllerComentario.listaPorIdEntrega(idEntrega)

	return new Response(JSON.stringify(res))
}

