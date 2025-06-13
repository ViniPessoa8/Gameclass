import TurmaController from "$lib/server/controllers/turma";

const turmaController = new TurmaController()

export async function load({ cookies }) {
	const message = cookies.get("toast");
	let sessionRaw = cookies.get('session')
	const session = JSON.parse(sessionRaw)
	const idProfessor = session.id
	let data = {};

	let turmas = await turmaController.listaPorProfessor(idProfessor)
	data.turmas = turmas

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
