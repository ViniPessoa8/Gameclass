import TurmaController from "$lib/server/controllers/turma"

const turmaController = new TurmaController()

export async function load({ params, cookies }) {
	let data = {}
	let estudantes = await turmaController.listaAlunos(params.id)

	if (estudantes && estudantes.length == 0) {
		return { estudantes: [] }
	}

	data["estudantes"] = estudantes
	return data
}
