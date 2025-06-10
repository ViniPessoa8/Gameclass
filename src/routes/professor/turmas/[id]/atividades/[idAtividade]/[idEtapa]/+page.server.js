import { listaEntregasPorItemAtividadeId } from "$lib/server/controllers/entrega";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import AtividadeController from "$lib/server/controllers/atividade";
import TurmaController from "$lib/server/controllers/turma";
import EntregaController from "$lib/server/controllers/entrega";
import AvaliacaoController from "$lib/server/controllers/avaliacao";
import GrupoController from "$lib/server/controllers/grupo";
import FormacaoGrupoController from "$lib/server/controllers/formacaoGrupo";

const itemAtividadeController = new ItemAtividadeController()
const atividadeController = new AtividadeController()
const turmaController = new TurmaController()
const entregaController = new EntregaController()
const avaliacaoController = new AvaliacaoController()
const grupoController = new GrupoController()
const formacaoGrupoController = new FormacaoGrupoController()

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")
	const idEtapa = params.idEtapa
	const etapa = (await itemAtividadeController.buscarItemAtividadePorId(idEtapa)).toObject()
	const atividade = (await atividadeController.buscarPorId(etapa.id_atividade)).toObject()
	const estudantes = await turmaController.listarAlunos(atividade.id_turma)
	const entregas = await entregaController.listarPorItemAtividade(idEtapa)
	const criterios = await itemAtividadeController.listaCriteriosPorIdItemAtividade(idEtapa)
	const grupos = await grupoController.listaGruposPorIdItemAtividade(idEtapa)
	const formacoes = await formacaoGrupoController.listaPorIdItemAtividade(idEtapa)

	let avaliacoes = []
	for (const entrega of entregas) {
		const avaliacao = await avaliacaoController.buscarAvaliacao(entrega.id)
		if (avaliacao) {
			entrega.avaliacao = avaliacao.toObject()
		} else {
			entrega.avaliacao = null
		}
	}

	etapa.criterios = criterios
	etapa.grupos = grupos
	etapa.formacoes = formacoes

	return { "usuario": data, "etapa": etapa, "atividade": atividade, "estudantes": estudantes, "entregas": entregas, "avaliacoes": avaliacoes }
}
