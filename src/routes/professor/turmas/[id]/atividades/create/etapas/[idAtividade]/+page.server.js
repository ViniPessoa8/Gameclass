import { fail, redirect } from "@sveltejs/kit"
import { cadastraItemAtividade } from '$controllers/itemAtividade.js';
import { ATRIBUICAO, REALIZACAO } from "$lib/constants";

export let actions = {
	default: async ({ cookies, params, request }) => {
		let idUsuario = JSON.parse(await cookies.get("session"));
		idUsuario = idUsuario.id
		let data = await request.formData();
		let etapasData = data.get('etapas')
		let etapas = JSON.parse(etapasData)

		let criterios
		let titulo
		let descricao
		let notaMax
		let dtEntregaMin
		let dtEntregaMax
		let atribuicaoNotas
		let realizacao
		let receberAposPrazo
		let idAtividadePai

		if (!etapas) {
			fail(401, "Erro ao carregar etapas: lista vazia")
		}

		for (const etapa of etapas) {
			criterios = etapa.criterios
			titulo = etapa.titulo
			descricao = etapa.descricao
			notaMax = parseFloat(etapa.criterios.map((elem) => elem.nota_max).reduce((elem, acc) => (elem + acc)))
			dtEntregaMin = new Date(etapa.dtEntregaMin)
			dtEntregaMax = new Date(etapa.dtEntregaMax)
			atribuicaoNotas = etapa.atribuicaoNotasGroup
			realizacao = etapa.realizacaoGroup
			receberAposPrazo = Boolean(etapa.receberAposPrazo)
			idAtividadePai = params.idAtividade

			atribuicaoNotas = atribuicaoNotas === "Média Simples" ? ATRIBUICAO.media_simples : ATRIBUICAO.media_ponderada
			realizacao = realizacao === "Individual" ? REALIZACAO.individual : REALIZACAO.grupos

			try {
				await cadastraItemAtividade(
					titulo,
					descricao,
					notaMax,
					dtEntregaMin,
					dtEntregaMax,
					atribuicaoNotas,
					realizacao,
					receberAposPrazo,
					0,
					0,
					idAtividadePai,
					criterios,
				);

			} catch (e) {
				const errorMessage = typeof e === 'string' ? e : e.message

				if (errorMessage.includes("Dados obrigatórios não foram preenchidos.")) {
					fail(401, "Dados obrigatórios não foram preenchidos.")
				} else {
					fail(401, e.message)
				}
			}
		}

		if (cookies.get("toast") != "atividade_criada") {
			cookies.set("toast", 'etapas_criadas', { path: "/" })
		}

		redirect(300, `/professor/turmas/${params.id}/atividades/`)
	}
}
