import { redirect, fail } from "@sveltejs/kit";
import { registraTurma } from "$lib/server/controllers/turma"

export function load() {
	console.log("turmas/create/server/")
}

export const actions = {
	default: async ({ request, cookies }) => {
		let res;

		const data = await request.formData();
		const session = JSON.parse(cookies.get('session'));
		const professorId = session["id"];

		try {

			res = await registraTurma(
				data.get('codigo'),
				data.get('disciplina'),
				data.get('nome'),
				data.get('descricao'),
				data.get('ano'),
				data.get('periodo'),
				data.get('local'),
				data.get('instituicao'),
				professorId,
			)
			console.log(res)

		} catch (e) {
			console.log(e)
			if (e.body.already_registered) {
				return fail("Turma já registrada", { already_registered: true })
			}
		}
		if (res.id) {
			cookies.set("toast", 'turma_criada', { path: "/" })
			redirect(300, "/autenticado/turmas")
		}
	}
}
