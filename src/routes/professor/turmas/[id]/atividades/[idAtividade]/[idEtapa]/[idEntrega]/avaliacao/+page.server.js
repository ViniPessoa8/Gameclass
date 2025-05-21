import { redirect } from "@sveltejs/kit";
import { buscaEstudantePorId } from '$controllers/estudante.js';
import { findUserByLogin } from "$repositories/auth";
import { listaAnexosPorIdEntrega } from "$controllers/anexo";
import AtividadeController from "$lib/server/controllers/atividade";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import EntregaController from "$lib/server/controllers/entrega";

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const entregaController = new EntregaController()

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEntrega = params.idEntrega
	const idEtapa = params.idEtapa

	const etapa = (await itemAtividadeController.buscarItemAtividadePorId(idEtapa)).toObject()
	const atividade = (await atividadeController.buscarPorId(etapa.id_atividade)).toObject()
	const entrega = (await entregaController.buscarPorId(idEntrega)).toObject()
	const estudante = await buscaEstudantePorId(parseInt(entrega.id_estudante))
	const usuario = await findUserByLogin(data.login)
	const anexos = await listaAnexosPorIdEntrega(idEntrega)
	const criterios = await itemAtividadeController.listaCriteriosPorIdItemAtividade(idEtapa)
	const notas = await entregaController.listarNotasObtidasDeCriterios(idEntrega)

	entrega["anexos"] = anexos
	usuario["cor"] = usuario.cor
	etapa["criterios"] = criterios
	entrega["notas"] = notas ? notas : []

	return { "usuario": data, "entrega": entrega, "atividade": atividade, "etapa": etapa, "nomeEstudante": estudante.nome }
}

export const actions = {
	criar: async ({ request, cookies, params }) => {
		let res;

		const notas = await request.formData();
		const idEntrega = params.idEntrega;

		try {

			res = await entregaController.avaliar(idEntrega, notas)

		} catch (e) {
			console.error(e)
			if (e.body.already_registered) {
				return fail("Turma já registrada", { already_registered: true })
			}
		}
		if (res) {
			cookies.set("toast", 'avaliacao_realizada', { path: "/" })
			const novaUrl = request.url.replace("avaliacao", "");
			redirect(301, novaUrl)
		}
	},

	alterar: async ({ request, cookies, params }) => {
		let res;

		const notas = await request.formData();
		const idEntrega = params.idEntrega;

		res = await entregaController.alteraAvaliacao(idEntrega, notas)

		if (res) {
			cookies.set("toast", 'avaliacao_atualizada', { path: "/" })
			const novaUrl = request.url.replace("avaliacao", "");
			redirect(301, novaUrl)
		}
	}
}
