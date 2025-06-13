import { fail, redirect } from "@sveltejs/kit"
import { ATRIBUICAO, REALIZACAO } from "$lib/constants";
import { page } from '$app/state';
import AtividadeController from "$lib/server/controllers/atividade";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import FormacaoGrupoController from "$lib/server/controllers/formacaoGrupo";

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const formacaoGrupoController = new FormacaoGrupoController()

export async function load({ cookies, params }) {
	const idAtividade = params.id
	const atividade = (await atividadeController.buscaPorId(idAtividade)).toObject()

	return { "atividade": atividade }
}

export let actions = {
	default: async ({ cookies, params, request, url }) => {
		let idUsuario = JSON.parse(await cookies.get("session"));
		idUsuario = idUsuario.id

		let data = await request.formData();
		let etapasData = JSON.parse(data.get('etapas'))
		const etapas = etapasData;

		let idAtividadePai
		let criterios
		let titulo
		let descricao
		let notaMax
		let dtEntregaMin
		let dtEntregaMax
		let atribuicaoNotas
		let realizacao
		let receberAposPrazo
		let formacoes

		if (!etapas) {
			fail(401, "Erro ao carregar etapas: lista vazia")
		}

		for (const etapa of etapas) {
			console.debug("Etapa => ", etapa)
			idAtividadePai = params.idAtividade
			criterios = etapa.criterios
			titulo = etapa.titulo
			descricao = etapa.descricao
			notaMax = parseFloat(etapa.criterios.map((elem) => elem.nota_max).reduce((elem, acc) => (elem + acc)))
			dtEntregaMin = new Date(etapa.dtEntregaMin)
			dtEntregaMax = new Date(etapa.dtEntregaMax)
			atribuicaoNotas = etapa.atribuicaoNotasGroup
			realizacao = etapa.realizacaoGroup
			receberAposPrazo = Boolean(etapa.receberAposPrazo)
			formacoes = etapa.formacoes

			// TODO: Instanciar objeto de ItemAtividade e usar ele no cadastra(itemAtividade)

			atribuicaoNotas = atribuicaoNotas === "Média Simples" ? ATRIBUICAO.media_simples : ATRIBUICAO.media_ponderada
			const emGrupos = realizacao === "Individual" ? false : true

			try {
				console.debug("Cadastrando =>", titulo, descricao, notaMax, dtEntregaMin, dtEntregaMax, atribuicaoNotas, realizacao, receberAposPrazo, idAtividadePai, criterios)

				const idItemAtividade = await itemAtividadeController.cadastra(
					titulo,
					descricao,
					notaMax,
					dtEntregaMin,
					dtEntregaMax,
					atribuicaoNotas,
					emGrupos,
					receberAposPrazo,
					idAtividadePai,
					criterios,
				);

				// Formações de grupo
				if (emGrupos) {
					for (const formacao of formacoes) {
						console.debug("FORMAÇÃO => ", formacao)
						formacaoGrupoController.cadastra({ id_item_atividade: idItemAtividade, numero_grupos: formacao.nGrupos, numero_alunos: formacao.nAlunos })
					}
				}
			} catch (e) {
				console.error("Erro ao cadastrar Item da atividade: ", e)
				const errorMessage = typeof e === 'string' ? e : e.message

				if (errorMessage.includes("Dados obrigatórios não foram preenchidos.")) {
					return fail(401, "Dados obrigatórios não foram preenchidos.")
				} else {
					return fail(401, errorMessage)
				}
			}
		}

		if (cookies.get("toast") != "atividade_criada") {
			cookies.set("toast", 'etapas_criadas', { path: "/" })
		}

		redirect(300, `/professor/turmas/${params.id}/atividades/`)
	}
}
