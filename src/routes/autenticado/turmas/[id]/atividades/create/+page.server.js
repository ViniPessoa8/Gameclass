import { getTurmaById } from "$lib/server/controllers/turma"

export async function load({ params }) {
	const turmaId = params.id
	console.log("atividades/create/server turmaId: " + turmaId)
	const turma = await getTurmaById(turmaId)
	console.log("atividades/create/server nomeTurma: " + turma.nome)

	return { "nomeTurma": turma.nome }
}
