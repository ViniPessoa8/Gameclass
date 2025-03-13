import { listaComentariosPorIdEntrega } from "$controllers/comentario";

export async function POST(event) {
	const body = await event.request.json();
	const idEntrega = body["idEntrega"]

	const res = await listaComentariosPorIdEntrega(idEntrega)

	return new Response(JSON.stringify(res))
}

