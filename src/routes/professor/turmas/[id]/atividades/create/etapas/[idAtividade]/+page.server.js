import { redirect } from "@sveltejs/kit"
import AtividadeController from "$lib/server/controllers/atividade";
import { FORMACAO_GRUPO } from "$lib/constants";

const atividadeController = new AtividadeController()

export async function load({ cookies, params }) {
	console.debug("entrou")
	const idAtividade = params.id
	const atividade = (await atividadeController.buscaPorId(idAtividade)).toObject()
	console.debug("atividade => ", atividade)

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
