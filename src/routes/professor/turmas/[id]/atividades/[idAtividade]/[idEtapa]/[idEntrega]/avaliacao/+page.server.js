import { redirect } from "@sveltejs/kit";
import AtividadeController from "$lib/server/controllers/atividade";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import EntregaController from "$lib/server/controllers/entrega";
import AvaliacaoController from "$lib/server/controllers/avaliacao";
import AnexoController from "$lib/server/controllers/anexo";
import EstudanteController from "$lib/server/controllers/estudante";
import UsuarioController from "$lib/server/controllers/usuario";
import Avaliacao from "$lib/models/Avaliacao";

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const entregaController = new EntregaController()
const avaliacaoController = new AvaliacaoController()
const anexoController = new AnexoController()
const estudanteController = new EstudanteController()
const usuarioController = new UsuarioController()

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEntrega = params.idEntrega
	const idEtapa = params.idEtapa

	const etapa = (await itemAtividadeController.buscaPorId(idEtapa)).toObject()
	const atividade = (await atividadeController.buscaPorId(etapa.id_atividade)).toObject()
	const entrega = (await entregaController.buscaPorId(idEntrega)).toObject()
	const estudante = await estudanteController.buscaPorId(parseInt(entrega.id_estudante))
	const usuario = await usuarioController.buscaPorLogin(data.login)
	const anexos = await anexoController.listaPorIdEntrega(idEntrega)
	const criterios = await itemAtividadeController.listaCriteriosPorId(idEtapa)
	const notas = await entregaController.listaNotasObtidasDeCriterios(idEntrega)

	entrega["anexos"] = anexos.map((e) => e.toObject())
	usuario["cor"] = usuario.cor
	etapa["criterios"] = criterios
	entrega["notas"] = notas ? notas : []

	return { "usuario": data, "entrega": entrega, "atividade": atividade, "etapa": etapa, "nomeEstudante": estudante.nome }
}

export const actions = {
	criar: async ({ request, cookies, params }) => {
		let res;

		const notas = Array.from(await request.formData());
		const idEntrega = params.idEntrega;

		console.debug("NOTAS => ", notas)

		try {

			const avaliacao = new Avaliacao({ id_entrega: idEntrega, criterios_avaliados: notas })
			console.debug("AVALIACAO => ", avaliacao)
			res = await avaliacaoController.avalia(avaliacao)

		} catch (e) {
			console.error(e)
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

		let notasObj = [];
		notas.forEach((valor, indice) => {
			notasObj.push({
				nota: valor,
				id_item_atividade: indice
			});
		});
		const idEntrega = params.idEntrega;

		const avaliacao = new Avaliacao({ id_entrega: idEntrega, criterios_avaliados: notasObj })
		console.debug("avaliacao => ", avaliacao)
		res = await avaliacaoController.alteraAvaliacao(avaliacao)

		if (res) {
			cookies.set("toast", 'avaliacao_atualizada', { path: "/" })
			const novaUrl = request.url.replace("avaliacao", "");
			redirect(301, novaUrl)
		}
	}
}
