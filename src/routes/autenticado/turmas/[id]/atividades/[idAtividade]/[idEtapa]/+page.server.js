
import { redirect } from "@sveltejs/kit";
import { buscaItemAtividadePorId } from '$controllers/itemAtividade.js';

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	if (!session_raw) {
		console.log("Usuário não autenticado")
		redirect(300, "/")
	}
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEtapa = params.idEtapa
	const etapa = await buscaItemAtividadePorId(idEtapa)

	return { "usuario": data, "etapa": etapa }
}
