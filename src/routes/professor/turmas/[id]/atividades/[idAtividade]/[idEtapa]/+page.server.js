
import { redirect } from "@sveltejs/kit";
import { buscaItemAtividadePorId } from '$controllers/itemAtividade.js';
import { getAtividadeById } from "$controllers/atividade";
import { listAlunosByTurmaId } from "$lib/server/controllers/turma";
import { listaEntregasPorItemAtividadeId } from "$lib/server/controllers/entrega";

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")
	const idEtapa = params.idEtapa
	const etapa = await buscaItemAtividadePorId(idEtapa)
	const atividade = await getAtividadeById(etapa.id_atividade)
	const estudantes = await listAlunosByTurmaId(atividade.id_turma)
	const entregas = await listaEntregasPorItemAtividadeId(idEtapa)

	return { "usuario": data, "etapa": etapa, "atividade": atividade, "estudantes": estudantes, "entregas": entregas }
}
