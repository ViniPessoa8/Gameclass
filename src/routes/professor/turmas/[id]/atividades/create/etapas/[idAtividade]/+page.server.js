import { redirect } from "@sveltejs/kit"
import AtividadeController from "$lib/server/controllers/atividade"

export async function load({ params }) {
	const atividadeController = new AtividadeController();
	const idAtividade = params.idAtividade

	const atividade = (await atividadeController.buscaPorId(idAtividade)).toObject()

	console.assert(atividade != null, `Turma ${idAtividade} não encontrada.`)

	return { "atividade": atividade }
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
