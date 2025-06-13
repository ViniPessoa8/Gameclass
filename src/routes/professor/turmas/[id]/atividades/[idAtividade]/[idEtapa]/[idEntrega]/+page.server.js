import { buscaEstudantePorId } from '$controllers/estudante.js';
import { listaComentariosPorIdEntrega } from "$lib/server/controllers/comentario";
import { findUserByLogin } from "$lib/server/repositories/auth";
import { listaAnexosPorIdEntrega } from "$lib/server/controllers/anexo";
import AtividadeController from "$lib/server/controllers/atividade";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import EntregaController from "$lib/server/controllers/entrega";
import AvaliacaoController from '$lib/server/controllers/avaliacao';
import GrupoController from '$lib/server/controllers/grupo';

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const entregaController = new EntregaController()
const avaliacaoController = new AvaliacaoController()
const grupoController = new GrupoController()

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEntrega = params.idEntrega
	const idEtapa = params.idEtapa

	const usuario = await findUserByLogin(data.login)
	const etapa = (await itemAtividadeController.buscarItemAtividadePorId(idEtapa)).toObject()
	const atividade = (await atividadeController.buscarPorId(etapa.id_atividade)).toObject()
	const entrega = (await entregaController.buscarPorId(idEntrega)).toObject()
	const entregaAvaliada = await avaliacaoController.buscarAvaliacao(entrega.id)
	const comentarios_entrega = await listaComentariosPorIdEntrega(parseInt(entrega.id)) // TODO: controller
	const anexos = await listaAnexosPorIdEntrega(idEntrega) // TODO: controller

	let estudante, grupo;
	if (etapa.em_grupos) {
		grupo = await grupoController.buscaPorId(parseInt(entrega.id_grupo_de_alunos))
	} else {
		estudante = await buscaEstudantePorId(parseInt(entrega.id_estudante)) // TODO: controller
	}


	entrega["comentarios"] = comentarios_entrega
	entrega["anexos"] = anexos
	entrega["avaliada"] = entregaAvaliada ? true : false
	usuario["cor"] = usuario.cor


	let toast = ''
	const message = cookies.get("toast");

	if (message !== '') {
		cookies.set("toast", "", { path: '/' });
		toast = message
	}



	let returnData = { "usuario": data, "entrega": entrega, "atividade": atividade, "etapa": etapa, "nome": etapa.em_grupos ? grupo[0].nome : estudante.nome, "toast": toast }

	return returnData
}
