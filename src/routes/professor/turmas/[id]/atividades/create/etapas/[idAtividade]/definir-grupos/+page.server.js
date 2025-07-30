import TurmaController from '$lib/server/controllers/turma';
import FormacaoGrupoController from '$lib/server/controllers/formacaoGrupo';

export async function load({ params }) {

	const turmaController = new TurmaController()
	const formacaoController = new FormacaoGrupoController()

	// 1. Buscar todos os estudantes da turma.
	const alunosDaTurma = await turmaController.listaAlunos(params.id)
	console.debug("alunosDaTurma[0] => ", alunosDaTurma[0])

	// 2. Buscar as formações de grupos para delimitar o numero e tamanho dos grupos.
	const formacoes = await formacaoController.listaPorIdItemAtividade(params.idAtividade)
	console.debug("formacoes => ", formacoes)

	// 3. Buscar os grupos e seus integrantes para o `item_atividade`.
	// (tabelas `grupo_de_alunos` e `integrante_grupo_de_alunos`).
	let indiceGrupo = 1;
	const grupos = []
	formacoes.forEach((formacao, index) => {
		for (let i = 1; i <= formacao.numero_grupos; i++) {
			let novoGrupo = {
				id: 'g' + indiceGrupo,
				nome: 'Grupo ' + indiceGrupo,
				integrantes: [],
				maxIntegrantes: formacao.numero_alunos
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
