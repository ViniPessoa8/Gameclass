import TurmaController from '$lib/server/controllers/turma';
import FormacaoGrupoController from '$lib/server/controllers/formacaoGrupo';
import GrupoController from '$lib/server/controllers/grupo';

export let actions = {
	default: async ({ cookies, params, request, url }) => {
		console.debug("action")
		// redirect(300, `${url.pathname}/resumo/`)
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
