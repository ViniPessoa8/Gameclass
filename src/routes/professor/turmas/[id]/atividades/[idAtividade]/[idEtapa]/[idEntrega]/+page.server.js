import AtividadeController from "$lib/server/controllers/atividade";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import EntregaController from "$lib/server/controllers/entrega";
import AvaliacaoController from '$lib/server/controllers/avaliacao';
import GrupoController from '$lib/server/controllers/grupo';
import ComentarioController from '$lib/server/controllers/comentario';
import AnexoController from '$lib/server/controllers/anexo';
import EstudanteController from '$lib/server/controllers/estudante';
import UsuarioController from '$lib/server/controllers/usuario';

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const entregaController = new EntregaController()
const avaliacaoController = new AvaliacaoController()
const grupoController = new GrupoController()
const comentarioController = new ComentarioController()
const anexoController = new AnexoController()
const estudanteController = new EstudanteController()
const usuarioController = new UsuarioController()

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEntrega = params.idEntrega
	const idEtapa = params.idEtapa

	const usuario = await usuarioController.buscaPorLogin(data.login)
	const etapa = (await itemAtividadeController.buscaItemAtividadePorId(idEtapa)).toObject()
	const atividade = (await atividadeController.buscaPorId(etapa.id_atividade)).toObject()
	const entrega = (await entregaController.buscaPorId(idEntrega)).toObject()
	const entregaAvaliada = await avaliacaoController.buscaAvaliacao(entrega.id)
	const comentarios_entrega = await comentarioController.listaPorIdEntrega(parseInt(entrega.id))
	const anexos = await anexoController.listaPorIdEntrega(idEntrega)

	let estudante, grupo;
	if (etapa.em_grupos) {
		grupo = await grupoController.buscaPorId(parseInt(entrega.id_grupo_de_alunos))
	} else {
		estudante = await estudanteController.buscaEstudantePorId(parseInt(entrega.id_estudante))
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

	let returnData = {
		"usuario": data,
		"entrega": entrega,
		"atividade": atividade,
		"etapa": etapa,
		"nome": etapa.em_grupos ? grupo[0].nome : estudante.nome,
		"toast": toast
	}

	return returnData
}
