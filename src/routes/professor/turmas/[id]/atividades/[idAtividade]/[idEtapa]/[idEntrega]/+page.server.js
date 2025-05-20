import { redirect } from "@sveltejs/kit";
import { buscaEntregaPorId, buscaAvaliacaoEntrega } from '$controllers/entrega.js';
import { getAtividadeById } from '$controllers/atividade.js';
import { buscaItemAtividadePorId } from '$controllers/itemAtividade.js';
import { buscaEstudantePorId } from '$controllers/estudante.js';
import { listaComentariosPorIdEntrega } from "$lib/server/controllers/comentario";
import { findUserByLogin } from "$lib/server/repositories/auth";
import { listaAnexosPorIdEntrega } from "$lib/server/controllers/anexo";

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEntrega = params.idEntrega
	const idEtapa = params.idEtapa

	const usuario = await findUserByLogin(data.login)
	const etapa = await buscaItemAtividadePorId(idEtapa)
	const atividade = await getAtividadeById(etapa.id_atividade)
	const entrega = await buscaEntregaPorId(idEntrega)
	const comentarios_entrega = await listaComentariosPorIdEntrega(parseInt(entrega.id))
	const anexos = await listaAnexosPorIdEntrega(idEntrega)
	const estudante = await buscaEstudantePorId(parseInt(entrega.id_estudante))
	const entregaAvaliada = await buscaAvaliacaoEntrega(idEntrega)

	entrega["comentarios"] = comentarios_entrega
	entrega["anexos"] = anexos
	entrega["avaliada"] = entregaAvaliada.length > 0 ? true : false
	usuario["cor"] = usuario.cor

	let toast = ''
	const message = cookies.get("toast");

	if (message !== '') {
		cookies.set("toast", "", { path: '/' });
		toast = message
	}

	return { "usuario": data, "entrega": entrega, "atividade": atividade, "etapa": etapa, "nomeEstudante": estudante.nome, "toast": toast }
}
