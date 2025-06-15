import ItemAtividadeController from "$lib/server/controllers/itemAtividade";

const itemAtividadeController = new ItemAtividadeController()

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEtapa = params.idEtapa
	const etapa = await itemAtividadeController.buscaItemId(idEtapa)

	return { "usuario": data, "etapa": etapa }
}
