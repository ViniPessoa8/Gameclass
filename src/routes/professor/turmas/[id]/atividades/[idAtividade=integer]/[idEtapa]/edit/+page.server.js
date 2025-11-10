import { redirect } from "@sveltejs/kit"
import AtividadeController from "$lib/server/controllers/atividade"
import { FORMACAO_GRUPO } from "$lib/constants";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";

export async function load({ params }) {
	const atividadeController = new AtividadeController();
	const itemAtividadeController = new ItemAtividadeController();

	const idAtividade = params.idAtividade
	const idEtapa = params.idEtapa

	const atividade = (await atividadeController.buscaPorId(idAtividade)).toObject()
	const etapa = (await itemAtividadeController.buscaPorId(idEtapa)).toObject()
	etapa.criterios = await itemAtividadeController.listaCriteriosPorId(etapa.id)

	console.assert(atividade != null, `Turma ${idAtividade} não encontrada.`)

	return { "atividade": atividade, "etapa": etapa }
}

export let actions = {
	default: async ({ cookies, params, request, url }) => {
		const itemAtividadeController = new ItemAtividadeController();
		const formData = await request.formData()
		const etapa = JSON.parse(formData.get("etapa"))

		await itemAtividadeController.altera(etapa)

		cookies.set("toast", 'etapa_editada', { path: "/" })
		redirect(300, `/professor/turmas/${params.id}/atividades`)

	}
}
