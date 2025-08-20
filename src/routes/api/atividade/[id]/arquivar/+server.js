import AtividadeController from "$lib/server/controllers/atividade";

const atividadeController = new AtividadeController()

export async function POST(event) {
	const idAtividade = event.params.id
	const res = await atividadeController.arquivar(idAtividade)

	return new Response(JSON.stringify(res))
}

