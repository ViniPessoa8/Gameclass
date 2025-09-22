import { redirect } from "@sveltejs/kit"
import AtividadeController from "$lib/server/controllers/atividade"
import { FORMACAO_GRUPO } from "$lib/constants";
import { page } from '$app/stores';
import CriterioController from "$lib/server/controllers/criterio";

export async function load({ url, params, cookies }) {
	const session = JSON.parse(cookies.get("session"));
	const atividadeController = new AtividadeController();
	const criterioController = new CriterioController();
	let idAtividade;
	let atividade;
	let idProfessor = session.id
	let retorno = {}

	const criteriosDoProfessor = await criterioController.listaPorIdProfessor(idProfessor)

	if (url.searchParams.has("idAtividade")) {
		idAtividade = url.searchParams.get("idAtividade")
		atividade = (await atividadeController.buscaPorId(idAtividade)).toObject()
	} else {
		atividade = JSON.parse(cookies.get("atividade"))
		idAtividade = atividade.id
	}

	console.assert(atividade != null, `Turma ${idAtividade} não encontrada.`)

	retorno.atividade = atividade
	retorno.criteriosDoProfessor = criteriosDoProfessor

	if (url.searchParams.has("idAtividade")) {
		retorno.parametroIdAtividade = idAtividade
	}

	return retorno
}

export let actions = {
	default: async ({ cookies, params, request, url }) => {
		const atividadeController = new AtividadeController();
		const formData = await request.formData()
		const realizacao = formData.get("realizacao_grupos")
		const formacao = formData.get(FORMACAO_GRUPO.professor_escolhe)

		if (url.searchParams.has("idAtividade")) {
			const idAtividade = url.searchParams.get("idAtividade")
			const atividade = (await atividadeController.buscaPorId(parseInt(idAtividade))).toObject()
			cookies.set("atividade", JSON.stringify(atividade), { path: '/' })
		}

		cookies.set("item_atividade", JSON.stringify(Object.fromEntries(formData)), { path: '/' })

		if (realizacao == "Em Grupos" && formacao == "Professor forma os grupos") {
			redirect(300, `${url.pathname}/definir-grupos/`)

		} else {
			redirect(300, `${url.pathname}/resumo/`)

		}
	}
}
