import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import AtividadeController from "$lib/server/controllers/atividade";
import TurmaController from "$lib/server/controllers/turma";
import EntregaController from "$lib/server/controllers/entrega";
import AvaliacaoController from "$lib/server/controllers/avaliacao";
import GrupoController from "$lib/server/controllers/grupo";
import FormacaoGrupoController from "$lib/server/controllers/formacaoGrupo";
import EstudanteController from '$lib/server/controllers/estudante';
import { AVALIACAO } from "../../../../../../../lib/constants";

const itemAtividadeController = new ItemAtividadeController()
const atividadeController = new AtividadeController()
const turmaController = new TurmaController()
const entregaController = new EntregaController()
const avaliacaoController = new AvaliacaoController()
const grupoController = new GrupoController()
const formacaoGrupoController = new FormacaoGrupoController()
const estudanteController = new EstudanteController()

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	const idEtapa = params.idEtapa
	const etapa = (await itemAtividadeController.buscaPorId(idEtapa)).toObject()
	const atividade = (await atividadeController.buscaPorId(etapa.id_atividade)).toObject()
	const estudantes = await turmaController.listaAlunos(atividade.id_turma)
	const entregas = await entregaController.listaPorItemAtividade(idEtapa)
	const criterios = await itemAtividadeController.listaCriteriosPorId(idEtapa)
	const grupos = await grupoController.listaPorIdItemAtividade(idEtapa)
	const formacoes = await formacaoGrupoController.listaPorIdItemAtividade(idEtapa)

	data.perfil = cookies.get("perfil")
	const visualizacaoEntregas = cookies.get("visualizacao_entregas")

	let avaliacoes = []
	// TODO: criar método para fazer busca por avaliacoes usando o id do item da atividade
	for (const entrega of entregas) {
		let entregaAvaliada
		if (etapa.em_grupos && etapa.tipo_avaliacao_nota == AVALIACAO.individual) {

			const avaliacao = await avaliacaoController.buscaAvaliacaoIntegrantes(entrega.id)
			const nAvaliacoes = avaliacao.map((value) => value.id_estudante).filter((value, index, _arr) => _arr.indexOf(value) == index).length; // Mapeia os valores por id_estudante único, para contar quantos estudantes foram avaliados.

			for (let i = 0; i < grupos.length; i++) {
				if (grupos[i].id == entrega.id_grupo_de_alunos) {
					grupos[i].integrantes = await estudanteController.buscaPorIdGrupo(parseInt(entrega.id_grupo_de_alunos))

					if (grupos[i].integrantes.length == nAvaliacoes) {
						entregaAvaliada = true
					} else {
						entregaAvaliada = false
					}
				}
			}
		} else {

			const avaliacao = await avaliacaoController.buscaPorIdEntrega(entrega.id)
			if (avaliacao) {
				entregaAvaliada = true
			} else {
				entregaAvaliada = false
			}

		}

		entrega.avaliacao = entregaAvaliada

	}

	etapa.criterios = criterios
	etapa.grupos = grupos
	etapa.formacoes = formacoes

	return { "usuario": data, "etapa": etapa, "atividade": atividade, "estudantes": estudantes, "entregas": entregas, "avaliacoes": avaliacoes, "visualizacao_entregas": visualizacaoEntregas }
}
