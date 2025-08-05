import TurmaController from '$lib/server/controllers/turma';
import FormacaoGrupoController from '$lib/server/controllers/formacaoGrupo';
import GrupoController from '$lib/server/controllers/grupo';
import IntegranteGrupoController from '$lib/server/controllers/integranteGrupo';
import { log, info, debug } from '$lib/utils/logger';
import { fail, redirect } from "@sveltejs/kit";

export let actions = {
	default: async ({ cookies, params, request, url }) => {
		const grupoController = new GrupoController();
		const integranteGrupoController = new IntegranteGrupoController();
		const formData = await request.formData();
		const grupos = JSON.parse(formData.get("grupos"))

		for (const grupo of grupos) {
			debug("[grupo.nome, params.idAtividade] = ", [grupo.nome, params.idAtividade])
			const idGrupo = (await grupoController.cadastra(grupo.nome, params.idAtividade)).rows[0].id
			info(`Grupo (${idGrupo}) criado`)

			for (const integrante of grupo.integrantes) {
				await integranteGrupoController.cadastra(integrante.id_estudante, idGrupo)
				info(`Integrante (${integrante.id_estudante} cadastrado no grupo ${idGrupo})`)
			}
		}

		let urlNova = `${url.pathname.split("/").slice(0, -1).join("/")}/resumo`

		debug("urlNova => ", urlNova)
		redirect(301, urlNova)
	}
}

export async function load({ cookies, params }) {
	const item_atividade = JSON.parse(cookies.get("item_atividade"))
	item_atividade.etapa = JSON.parse(item_atividade["etapas"])[0]
	delete item_atividade.etapas

	const turmaController = new TurmaController()
	const formacaoController = new FormacaoGrupoController()

	// 1. Buscar todos os estudantes da turma.
	const alunosDaTurma = await turmaController.listaAlunos(params.id)

	// 2. Buscar as formações de grupos para delimitar o numero e tamanho dos grupos.
	const formacoes = await formacaoController.listaPorIdItemAtividade(params.idAtividade)


	// 3. Buscar os grupos e seus integrantes para o `item_atividade`.
	// (tabelas `grupo_de_alunos` e `integrante_grupo_de_alunos`).
	let indiceGrupo = 1;
	const grupos = []
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

	const groupsFromDB = [
		{
			id: 'g1',
			nome: 'Grupo 1',
			integrantes: [alunosDaTurma.find(s => s.id === '7')] // João da Silva
		},
		{
			id: 'g2',
			nome: 'Grupo 2',
			integrantes: []
		},
		{
			id: 'g3',
			nome: 'Grupo 3',
			integrantes: []
		},
	];

	return {
		estudantes: alunosDaTurma,
		groups: grupos,
		formacoes: formacoes,
		activity: { title: 'Avaliação Parcial 1' }
	};
}
