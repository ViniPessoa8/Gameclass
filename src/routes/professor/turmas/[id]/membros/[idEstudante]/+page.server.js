import TurmaController from "$lib/server/controllers/turma"
import EstudanteController from "$lib/server/controllers/estudante"
import RankingController from "$lib/server/controllers/ranking"

const turmaController = new TurmaController()
const estudanteController = new EstudanteController()
const rankingController = new RankingController()

export async function load({ params, cookies }) {
	const session = JSON.parse(cookies.get("session"));
	let data = {}

	let idTurma = params.id
	let idEstudante = params.idEstudante
	let idProfessor = session.id

	data.turma = await turmaController.buscaPorCodigo(idTurma)
	data.estudante = await estudanteController.buscaPorId(idEstudante)
	let ranking = await rankingController.listaRankingPorIdTurma(idTurma)
	ranking = ranking.sort((a, b) => a.pontos > b.pontos).map((e, i) => {
		e.index = i + 1
		return e
	})

	const estudante = ranking.filter((e) => e.id == idEstudante)
	data.estudante.posicao_ranking = estudante[0].index

	data.outras_turmas = await turmaController.listaPorEstudanteProfessor(idEstudante, idProfessor)
	data.outras_turmas = data.outras_turmas.filter((t) => t.id != idTurma)

	return data
}
