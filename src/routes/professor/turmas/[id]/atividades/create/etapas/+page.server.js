import { redirect, fail } from "@sveltejs/kit"
import AtividadeController from "$lib/server/controllers/atividade"
import ItemAtividadeController from "$lib/server/controllers/itemAtividade"
import { FORMACAO_GRUPO } from "$lib/constants";
import CriterioController from "$lib/server/controllers/criterio";
import TurmaController from "$lib/server/controllers/turma";
import { error, info, debug } from "$lib/utils/logger"

export async function load({ url, params, cookies }) {
	const session = JSON.parse(cookies.get("session"));
	const atividadeController = new AtividadeController();
	const criterioController = new CriterioController();
	const turmaController = new TurmaController();

	let idAtividade;
	let atividade;
	let idProfessor = session.id
	let retorno = {}

	const criteriosDoProfessor = await criterioController.listaPorIdProfessor(idProfessor)
	const nAlunosTurma = (await turmaController.listaAlunos(params.id)).length

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
	retorno.nAlunosTurma = nAlunosTurma

	if (url.searchParams.has("idAtividade")) {
		retorno.parametroIdAtividade = idAtividade
	}

	return retorno
}

export let actions = {
	default: async ({ cookies, params, request, url }) => {
		debug("atividades/create/etapas/+page.server.js default action")
		const session = JSON.parse(cookies.get("session"));
		const atividadeController = new AtividadeController();
		const formData = await request.formData()
		const realizacao = formData.get("realizacao_grupos")
		const formacao = formData.get(FORMACAO_GRUPO.professor_escolhe)
		let idAtividade

		let idProfessor = session.id

		if (url.searchParams.has("idAtividade")) {
			idAtividade = url.searchParams.get("idAtividade")
			try {
				const atividade = (await atividadeController.buscaPorId(parseInt(idAtividade))).toObject()
				cookies.set("atividade", JSON.stringify(atividade), { path: '/' })

			} catch (e) {
				error("Error: ", e)

			}
		}

		// TODO: Validar se etapa com o mesmo nome ja existe
		// FIX: idAtividade == undefined
		const itemAtividadeController = new ItemAtividadeController()
		const titulo = formData.get("titulo")
		info("Verificando a existência de um item de atividade com o título: ", titulo)
		let etapa
		try {
			etapa = await itemAtividadeController.buscaPorTitulo(titulo, idAtividade)
		} catch (e) {
			error("Erro ao buscar item de atividade por titulo: ", e)
		}

		if (etapa) {
			error("Já existe uma etapa com o mesmo nome nessa atividade.")
			return fail(400, {
				erro: "Já existe uma etapa com o mesmo nome nessa atividade."
			});
		}

		cookies.set("item_atividade", JSON.stringify(Object.fromEntries(formData)), { path: '/' })

		if (realizacao == "Em Grupos" && formacao == "Professor forma os grupos") {
			debug(`atividades/create/etapas/+page.server.js redirect to ${url.pathname}/definir-grupos/`)
			redirect(300, `${url.pathname}/definir-grupos/`)

		} else {
			debug(`atividades/create/etapas/+page.server.js redirect to ${url.pathname}/resumo/`)
			redirect(300, `${url.pathname}/resumo/`)

		}
	}
}
