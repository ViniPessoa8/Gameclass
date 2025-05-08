import { getAtividadeById } from "$controllers/atividade";

export async function load({ cookies, params }) {
	// const session_raw = cookies.get("session");
	// const data = JSON.parse(session_raw);
	// data["perfil"] = cookies.get("perfil")
	const idAtividade = params.id
	const atividade = await getAtividadeById(idAtividade)
	// const estudantes = await listAlunosByTurmaId(atividade.id_turma)
	// const entregas = await listaEntregasPorItemAtividadeId(idEtapa)

	return { "atividade": atividade }
}
