import { listaEntregasPorItemAtividadeId } from "$lib/server/controllers/entrega";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import AtividadeController from "$lib/server/controllers/atividade";
import TurmaController from "$lib/server/controllers/turma";
import EntregaController from "$lib/server/controllers/entrega";

const itemAtividadeController = new ItemAtividadeController()
const atividadeController = new AtividadeController()
const turmaController = new TurmaController()
const entregaController = new EntregaController()

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

	etapa.criterios = criterios


	return { "usuario": data, "etapa": etapa, "atividade": atividade, "estudantes": estudantes, "entregas": entregas }
}
