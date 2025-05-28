import AtividadeController from "$lib/server/controllers/atividade";

const atividadeController = new AtividadeController()

export async function load({ params }) {
	const idAtividade = params.id
	const atividade = (await atividadeController.buscarPorId(idAtividade)).toObject()

	return { "atividade": atividade }
}

