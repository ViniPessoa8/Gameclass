import ItemAtividadeController from "$lib/server/controllers/itemAtividade";

const itemAtividadeController = new ItemAtividadeController()

export async function POST(event) {
	const idItemAtividade = event.params.id
	const res = await itemAtividadeController.arquivar(idItemAtividade)

	return new Response(JSON.stringify(res))
}

