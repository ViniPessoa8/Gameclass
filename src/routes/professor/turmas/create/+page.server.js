import { redirect, fail } from "@sveltejs/kit";
import TurmaController from "$lib/server/controllers/turma";
import { info, log } from "$lib/utils/logger"

const turmaController = new TurmaController()

export function load() {
	info("Carregando tela de criação de turmas")
}

export const actions = {
	default: async ({ request, cookies }) => {
		info("Criando nova turma...");

		let res;

		const data = await request.formData();
		const perfil = cookies.get("perfil")
		const sessionRaw = cookies.get('session')

		if (!sessionRaw) {
			console.log("Usuário não autenticado")
			redirect(300, "/")

		}
		const session = JSON.parse(sessionRaw);
		const professorId = session["id"];

		try {

			res = await turmaController.registra(
				{
					codigo: data.get('codigo'),
					disciplina: data.get('disciplina'),
					nome: data.get('nome'),
					descricao: data.get('descricao'),
					ano: data.get('ano'),
					periodo: data.get('periodo'),
					local: data.get('local'),
					instituicao: data.get('instituicao'),
					professorId,
				}
			)

		} catch (e) {
			console.log(e)
			if (e.includes("duplicate key")) {
				return fail(400, { duplicated: true, e: "Você já possui uma turma com o mesmo nome" })
			}
		}
		if (res.id) {
			cookies.set("toast", 'turma_criada', { path: "/" })
			redirect(300, `/${perfil}/turmas`)
		}
	}
}
