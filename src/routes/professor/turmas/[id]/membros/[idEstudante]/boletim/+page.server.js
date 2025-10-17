import TurmaController from "$lib/server/controllers/turma"
import EstudanteController from "$lib/server/controllers/estudante"
import AtividadeController from "$lib/server/controllers/atividade"
import ItemAtividadeController from "$lib/server/controllers/itemAtividade"
import AvaliacaoController from "$lib/server/controllers/avaliacao"
import RankingController from "$lib/server/controllers/ranking"
import { info, log } from "$lib/utils/logger"

const turmaController = new TurmaController()
const estudanteController = new EstudanteController()
const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const avaliacaoController = new AvaliacaoController()
const rankingController = new RankingController()

export async function load({ params, cookies }) {
	info(`Carregando página de boletim do estudante ${params.idEstudante} da turma ${params.id}`)
	let data = {}
	let idTurma = params.id
	let idEstudante = params.idEstudante

	data.turma = await turmaController.buscaPorCodigo(idTurma)
	data.estudante = await estudanteController.buscaPorId(idEstudante)
	let ranking = await rankingController.listaRankingPorIdTurma(idTurma)
	ranking = ranking.sort((a, b) => a.pontos > b.pontos).map((e, i) => {
		e.index = i + 1
		return e
	})

	const estudante = ranking.filter((e) => e.id == idEstudante)
	data.estudante.posicao_ranking = estudante[0].index
	data.atividades = []
	const atividades = await atividadeController.listaPorIdTurma(idTurma)

	for (const a of atividades) {
		a.itens_atividade = await itemAtividadeController.listaPorIdAtividade(a.id)
		for (const ia of a.itens_atividade) {
			ia.criterios = await itemAtividadeController.listaCriteriosPorId(a.id)
			ia.notas = await itemAtividadeController.listaNotasDeCriteriosPorId(a.id)
			ia.avaliacao = await avaliacaoController.buscaPorEstudanteItemAtividade(idEstudante, ia.id)
		}

		data.atividades.push(a);
	}

	data.atividades = atividades.map((a) => a.toObject())

	// if (estudantes && estudantes.length == 0) {
	// 	return { estudantes: [] }
	// }
	//
	// data["estudantes"] = estudantes
	return data
}
