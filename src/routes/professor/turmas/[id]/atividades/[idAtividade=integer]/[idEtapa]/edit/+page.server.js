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
	const etapa = (await itemAtividadeController.buscaPorId(idAtividade)).toObject()
	etapa.criterios = await itemAtividadeController.listaCriteriosPorId(etapa.id)

	console.assert(atividade != null, `Turma ${idAtividade} não encontrada.`)

	return { "atividade": atividade, "etapa": etapa }
}

export let actions = {
	default: async ({ cookies, params, request, url }) => {
		const formData = await request.formData()
		const realizacao = formData.get("realizacao_grupos")
		const formacao = formData.get(FORMACAO_GRUPO.professor_escolhe)

		cookies.set("item_atividade", JSON.stringify(Object.fromEntries(formData)), { path: '/' })

		if (realizacao == "Em Grupos" && formacao == "Professor forma os grupos") {
			redirect(300, `${url.pathname}/definir-grupos/`)

		} else {
			redirect(300, `${url.pathname}/resumo/`)

		}
	}
}
