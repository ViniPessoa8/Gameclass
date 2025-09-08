import TurmaController from '$lib/server/controllers/turma';
import FormacaoGrupoController from '$lib/server/controllers/formacaoGrupo';
import AtividadeController from '$lib/server/controllers/atividade';
import { redirect } from "@sveltejs/kit";

export let actions = {
	default: async ({ url }) => {
		let urlNova = `${url.pathname.split("/").slice(0, -1).join("/")}/resumo`
		redirect(301, urlNova)
	}
}

export async function load({ cookies, params }) {
	// const atividadeController = new AtividadeController()
	// const idAtividade = params.idAtividade
	// const atividade = await atividadeController.buscaPorId(idAtividade)
	const atividade = JSON.parse(cookies.get("atividade"))
	const item_atividade = JSON.parse(cookies.get("item_atividade"))
	item_atividade.etapa = JSON.parse(item_atividade["etapas"])[0]
	delete item_atividade.etapas

	const turmaController = new TurmaController()
	const formacaoController = new FormacaoGrupoController()

	const alunosDaTurma = await turmaController.listaAlunos(params.id)
	const formacoes = await formacaoController.listaPorIdItemAtividade(atividade.id)

	// Buscar os grupos e seus integrantes para o `item_atividade`.
	let grupos = [];
	let indiceGrupo = 1;
	item_atividade.etapa.formacoes.forEach((formacao) => {
		for (let i = 1; i <= formacao.nGrupos; i++) {
			let novoGrupo = {
				id: 'g' + indiceGrupo,
				nome: 'Grupo ' + indiceGrupo,
				integrantes: [],
				maxIntegrantes: formacao.nAlunos
			}

			indiceGrupo++;
			grupos.push(novoGrupo)

		}
	});


	return {
		estudantes: alunosDaTurma,
		groups: grupos,
		formacoes: formacoes,
		activity: { title: atividade.titulo }
	};
}
