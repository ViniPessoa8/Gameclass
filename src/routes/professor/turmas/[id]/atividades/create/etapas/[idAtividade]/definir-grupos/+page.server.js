import TurmaController from '$lib/server/controllers/turma';

export async function load({ params }) {

	const turmaController = new TurmaController()

	// 1. Buscar todos os estudantes da turma.
	const alunosDaTurma = await turmaController.listaAlunos(params.id)
	console.debug("alunosDaTurma[0] => ", alunosDaTurma[0])

	// 2. Buscar os grupos e seus integrantes para o `item_atividade`.
	// (tabelas `grupo_de_alunos` e `integrante_grupo_de_alunos`).
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
		students: alunosDaTurma,
		groups: groupsFromDB,
		activity: { title: 'Avaliação Parcial 1' }
	};
}
