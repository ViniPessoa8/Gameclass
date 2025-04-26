import { listAlunosByTurmaId } from "$lib/server/controllers/turma"

export async function load({ params, cookies }) {
	let data = {}
	let estudantes = await listAlunosByTurmaId(params.id)

	if (estudantes && estudantes.length == 0) {
		return { estudantes: [] }
	}

	data["estudantes"] = estudantes
	return data
}
