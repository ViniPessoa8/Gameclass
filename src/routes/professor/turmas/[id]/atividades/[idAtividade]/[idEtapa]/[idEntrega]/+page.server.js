import { redirect } from "@sveltejs/kit";
import { buscaEntregaPorId } from '$controllers/entrega.js';
import { getAtividadeById } from '$controllers/atividade.js';
import { buscaItemAtividadePorId } from '$controllers/itemAtividade.js';
import { buscaEstudantePorId } from '$controllers/estudante.js';
import { listaComentariosPorIdEntrega } from "../../../../../../../../lib/server/controllers/comentario";

export async function load({ cookies, params }) {
	console.debug("LOAD")
	const session_raw = cookies.get("session");
	if (!session_raw) {
		console.log("Usuário não autenticado")
		redirect(300, "/")
	}
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEntrega = params.idEntrega
	const idEtapa = params.idEtapa

	const etapa = await buscaItemAtividadePorId(idEtapa)
	const atividade = await getAtividadeById(etapa.id_atividade)
	const entrega = await buscaEntregaPorId(idEntrega)
	const estudante = await buscaEstudantePorId(parseInt(entrega.id_estudante))
	const comentarios_entrega = await listaComentariosPorIdEntrega(parseInt(entrega.id))

	entrega["comentarios"] = comentarios_entrega

	return { "usuario": data, "entrega": entrega, "atividade": atividade, "etapa": etapa, "nomeEstudante": estudante.nome }
}
