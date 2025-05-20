import { redirect } from "@sveltejs/kit";
import { buscaEntregaPorId, avaliaEntrega, listaNotasObtidasDeCriteriosPorIdEntrega, alteraAvaliacaoEntrega } from '$controllers/entrega.js';
import { getAtividadeById } from '$controllers/atividade.js';
import { buscaItemAtividadePorId, listaCriteriosPorIdItemAtividade } from '$controllers/itemAtividade.js';
import { buscaEstudantePorId } from '$controllers/estudante.js';
import { findUserByLogin } from "$repositories/auth";
import { listaAnexosPorIdEntrega } from "$controllers/anexo";

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEntrega = params.idEntrega
	const idEtapa = params.idEtapa

	const etapa = await buscaItemAtividadePorId(idEtapa)
	const atividade = await getAtividadeById(etapa.id_atividade)
	const entrega = await buscaEntregaPorId(idEntrega)
	const estudante = await buscaEstudantePorId(parseInt(entrega.id_estudante))
	const usuario = await findUserByLogin(data.login)
	const anexos = await listaAnexosPorIdEntrega(idEntrega)
	const criterios = await listaCriteriosPorIdItemAtividade(idEtapa)
	const notas = await listaNotasObtidasDeCriteriosPorIdEntrega(idEntrega)

	entrega["anexos"] = anexos
	usuario["cor"] = usuario.cor
	etapa["criterios"] = criterios
	entrega["notas"] = notas

	return { "usuario": data, "entrega": entrega, "atividade": atividade, "etapa": etapa, "nomeEstudante": estudante.nome }
}

export const actions = {
	criar: async ({ request, cookies, params }) => {
		let res;

		const notas = await request.formData();
		const idEntrega = params.idEntrega;

		try {

			res = await avaliaEntrega(idEntrega, notas)

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

		res = await alteraAvaliacaoEntrega(idEntrega, notas)

		if (res) {
			cookies.set("toast", 'avaliacao_atualizada', { path: "/" })
			const novaUrl = request.url.replace("avaliacao", "");
			redirect(301, novaUrl)
		}
	}
}
