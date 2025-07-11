import { redirect } from "@sveltejs/kit";
import AtividadeController from "$lib/server/controllers/atividade";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import EntregaController from "$lib/server/controllers/entrega";
import AvaliacaoController from "$lib/server/controllers/avaliacao";
import EstudanteController from "$lib/server/controllers/estudante";
import UsuarioController from "$lib/server/controllers/usuario";
import Avaliacao from "$lib/models/Avaliacao";
import AvaliacaoIntegranteCriterio from "$lib/models/AvaliacaoIntegranteCriterio";
import GrupoController from "$lib/server/controllers/grupo";

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const entregaController = new EntregaController()
const avaliacaoController = new AvaliacaoController()
const estudanteController = new EstudanteController()
const usuarioController = new UsuarioController()
const grupoController = new GrupoController()

export async function load({ url, cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	const idEntrega = params.idEntrega
	const idEtapa = params.idEtapa
	const idIntegrante = params.idIntegrante

	const etapa = (await itemAtividadeController.buscaPorId(idEtapa)).toObject()
	const atividade = (await atividadeController.buscaPorId(etapa.id_atividade)).toObject()
	const entrega = (await entregaController.buscaPorId(idEntrega)).toObject()
	const grupo = await grupoController.buscaPorId(parseInt(entrega.id_grupo_de_alunos))
	const integrantes = await estudanteController.buscaPorIdGrupo(parseInt(entrega.id_grupo_de_alunos))
	const usuario = await usuarioController.buscaPorLogin(data.login)
	const criterios = await itemAtividadeController.listaCriteriosPorId(idEtapa)
	const notas = await entregaController.listaNotasObtidasDeCriteriosIntegrante(idEntrega, idIntegrante)
	const idEstudanteIntegrante = integrantes.find((e) => e.id == idIntegrante).id
	const estudante = await estudanteController.buscaPorId(parseInt(idEstudanteIntegrante))

	data.perfil = cookies.get("perfil")
	usuario.cor = usuario.cor
	etapa.criterios = criterios
	entrega.notas = notas ? notas : []
	grupo.integrantes = integrantes

	let returnData = {}
	returnData.usuario = data
	returnData.entrega = entrega
	returnData.atividade = atividade
	returnData.etapa = etapa
	returnData.nomeEstudante = estudante?.nome
	returnData.nomeGrupo = grupo?.nome

	return returnData
}

export const actions = {
	criar: async ({ request, cookies, params }) => {
		let res;

		const criteriosAvaliados = Array.from(await request.formData());
		const idEntrega = params.idEntrega;
		const idEtapa = params.idEtapa
		const idIntegrante = params.idIntegrante
		const criterios = await itemAtividadeController.listaCriteriosPorId(idEtapa)

		let criteriosAvaliadosObj = [];
		criteriosAvaliados.forEach((valor, indice) => {
			criteriosAvaliadosObj.push({
				nota_atribuida: parseFloat(valor[1]),
				id: (criterios.find((e) => e.titulo == valor[0]).id)
			});
		});

		try {
			// TODO: Mudar avaliação para a avaliação de um integrante do grupo

			const avaliacao = new Avaliacao({ id_entrega: idEntrega, criterios_avaliados: criteriosAvaliadosObj })
			res = await avaliacaoController.avaliaIntegranteGrupo(idEntrega, idIntegrante, criteriosAvaliadosObj)

		} catch (e) {
			console.error(e)
		}
		if (res) {
			cookies.set("toast", 'avaliacao_realizada', { path: "/" })
			const novaUrl = request.url.split("/").slice(0, -2).join("/") + "/escolhaIntegrante";
			redirect(301, novaUrl)
		}
	},

	alterar: async ({ request, cookies, params }) => {
		let res;

		const criteriosAvaliados = Array.from(await request.formData());
		const idEntrega = params.idEntrega;
		const idEtapa = params.idEtapa

		const criterios = await itemAtividadeController.listaCriteriosPorId(idEtapa)

		let criteriosAvaliadosObj = [];
		criteriosAvaliados.forEach((valor, indice) => {
			criteriosAvaliadosObj.push({
				nota_atribuida: parseFloat(valor[1]),
				id: (criterios.find((e) => e.titulo == valor[0]).id)
			});
		});

		const avaliacao = new Avaliacao({ id_entrega: idEntrega, criterios_avaliados: criteriosAvaliadosObj })
		res = await avaliacaoController.alteraAvaliacao(avaliacao)

		if (res) {
			cookies.set("toast", 'avaliacao_atualizada', { path: "/" })
			const novaUrl = request.url.split("/").slice(0, -2).join("/") + "/escolhaIntegrante";
			redirect(301, novaUrl)
		}
	}
}
