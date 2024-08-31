import { registraTurma } from "$lib/server/controllers/turma";

export function load() {
	console.debug("[SERVER/ESTUDANTE/TURMAS]")
}

export const actions = {
	create: async ({ request }) => {

		const data = await request.formData();

		try {
			await registraTurma(data.get('codigo'), data.get('disciplina'), data.get('nome'), data.get('ano'), data.get('periodo'), data.get('local'), data.get('instituicao'),);
		} catch (e) {
			console.log("Erro [turmas/+page.server.js]: ", e)
		}

	}
}
