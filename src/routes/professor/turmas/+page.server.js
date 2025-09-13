import TurmaController from "$lib/server/controllers/turma";
import AtividadeController from "$lib/server/controllers/atividade";

const turmaController = new TurmaController()
const atividadeController = new AtividadeController()

export async function load({ cookies }) {
	const visualizacao = cookies.get('turmas_view_preference') || 'grade';
	const message = cookies.get("toast");
	let sessionRaw = cookies.get('session')
	const session = JSON.parse(sessionRaw)
	const idProfessor = session.id
	let data = {};

	let turmas = await turmaController.listaPorProfessor(idProfessor)
	for (const turma of turmas) {
		const nAlunos = (await turmaController.listaAlunos(turma.id)).length
		turma.numero_alunos = nAlunos

		const atividades = (await atividadeController.listaPorIdTurma(turma.id)).map((a) => a.toObject())
		turma.atividades = atividades
	}

	data.turmas = turmas
	data.visualizacao = visualizacao

	if (message === 'turma_criada') {
		cookies.set("toast", "", { path: '/' });
		data.toast = message
	} else {
		data.toast = ""
	}

	return data
}

export const actions = {
	create: async ({ request }) => {

		const data = await request.formData();

		try {
			await turmaController.registraTurma(data.get('codigo'), data.get('disciplina'), data.get('nome'), data.get('ano'), data.get('periodo'), data.get('local'), data.get('instituicao'));
		} catch (e) {
			console.log("Erro [turmas/+page.server.js]: ", e)
		}

	}
}
