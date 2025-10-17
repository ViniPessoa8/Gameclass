import TurmaController from "$lib/server/controllers/turma"
import { info, log } from "$lib/utils/logger"

const turmaController = new TurmaController()

export async function load({ params, cookies }) {
	info(`Carregando tela de membros da turma ${params.id}`)
	let data = {}
	let estudantes = await turmaController.listaAlunos(params.id)

	if (estudantes && estudantes.length == 0) {
		return { estudantes: [] }
	}

	data["idTurma"] = params.id
	data["estudantes"] = estudantes
	return data
}
