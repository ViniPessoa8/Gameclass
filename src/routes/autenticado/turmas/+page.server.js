import { registraTurma } from "$lib/server/controllers/turma";
import { getTurmasByIdProfessor } from "$controllers/turma"

export async function load({ cookies }) {
	console.debug("[SERVER/AUTENTICADO/TURMAS]")
	const message = cookies.get("toast");
	const session = JSON.parse(cookies.get('session'))
	const idProfessor = session.id
	let data = {};

	let turmas = await getTurmasByIdProfessor(idProfessor)
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
			await registraTurma(data.get('codigo'), data.get('disciplina'), data.get('nome'), data.get('ano'), data.get('periodo'), data.get('local'), data.get('instituicao'));
		} catch (e) {
			console.log("Erro [turmas/+page.server.js]: ", e)
		}

	}
}
