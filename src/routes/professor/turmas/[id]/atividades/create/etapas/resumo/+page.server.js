import { fail, redirect } from "@sveltejs/kit"
import AtividadeController from "$lib/server/controllers/atividade";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import FormacaoGrupoController from "$lib/server/controllers/formacaoGrupo";
import GrupoController from '$lib/server/controllers/grupo';
import IntegranteGrupoController from '$lib/server/controllers/integranteGrupo';
import { AVALIACAO, ATRIBUICAO, FORMACAO_GRUPO } from "$lib/constants";
import { log, info, debug, error } from '$lib/utils/logger';

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const formacaoGrupoController = new FormacaoGrupoController()
const grupoController = new GrupoController()
const integranteGrupoController = new IntegranteGrupoController()

export async function load({ cookies }) {
	const atividade = JSON.parse(cookies.get("atividade"))
	return { "atividade": atividade }
}

export let actions = {
	default: async ({ cookies, params, request }) => {
		info("Realizando cadastro da nova atividade e sua etapa no banco de dados")
		let idUsuario = JSON.parse(await cookies.get("session"));
		idUsuario = idUsuario.id

		let data = await request.formData();
		let atividade = JSON.parse(cookies.get("atividade"))
		let grupos = data.get("grupos")
		grupos = grupos == "" ? "" : JSON.parse(grupos)
		let etapasData = JSON.parse(data.get('etapas'))
		const etapas = etapasData;

		let criterios
		let titulo
		let descricao
		let notaMax
		let dtEntregaMin
		let dtEntregaMax
		let atribuicaoNotas
		let tipoAvaliacaoNota
		let tipoFormacaoGrupos
		let realizacao
		let receberAposPrazo
		let formacoes

		if (!atividade) {
			fail(401, "Erro ao cadastrar atividade: atividade vazia")
		}

		// Checa se a atividade ja existe
		let idAtividadePai
		if (!await atividadeController.buscaPorId(atividade.id)) {
			idAtividadePai = (await atividadeController.cadastra(atividade)).id
		} else {
			idAtividadePai = JSON.parse(cookies.get("atividade")).id
		}

		if (!etapas) {
			fail(401, "Erro ao carregar etapas: lista vazia")
		}

		for (const etapa of etapas) {
			criterios = etapa.criterios
			titulo = etapa.titulo
			descricao = etapa.descricao
			notaMax = parseFloat(etapa.criterios.map((elem) => elem.pontuacao_max).reduce((elem, acc) => (elem + acc)))
			dtEntregaMin = new Date(etapa.dtEntregaMin)
			dtEntregaMax = new Date(etapa.dtEntregaMax)
			atribuicaoNotas = etapa.atribuicaoNotasGroup
			tipoAvaliacaoNota = etapa.tipoAvaliacaoNotasGroup
			realizacao = etapa.realizacaoGroup
			tipoFormacaoGrupos = etapa.formacao
			receberAposPrazo = Boolean(etapa.receberAposPrazo)
			formacoes = etapa.formacoes

			// TODO: Instanciar objeto de ItemAtividade e usar ele no cadastra(itemAtividade)

			atribuicaoNotas = atribuicaoNotas === "Média Simples" ? ATRIBUICAO.media_simples : ATRIBUICAO.media_ponderada
			tipoAvaliacaoNota = tipoAvaliacaoNota === "Individual" ? AVALIACAO.individual : AVALIACAO.em_grupos
			const emGrupos = realizacao === "Individual" ? false : true

			try {

				const idItemAtividade = await itemAtividadeController.cadastra(
					titulo,
					descricao,
					notaMax,
					dtEntregaMin,
					dtEntregaMax,
					atribuicaoNotas,
					tipoAvaliacaoNota,
					emGrupos,
					receberAposPrazo,
					idAtividadePai,
					criterios,
				);

				// Formações de grupo
				if (emGrupos) {
					for (const formacao of formacoes) {
						formacaoGrupoController.cadastra({ id_item_atividade: idItemAtividade, numero_grupos: formacao.nGrupos, numero_alunos: formacao.nAlunos })
					}

					if (tipoFormacaoGrupos == "Professor forma os grupos") {
						for (const grupo of grupos) {
							const idGrupo = (await grupoController.cadastra(grupo.nome, idItemAtividade)).rows[0].id
							info(`Grupo ${idGrupo} criado`)

							for (const integrante of grupo.integrantes) {
								await integranteGrupoController.cadastra(integrante.id_estudante, idGrupo)
								info(`Integrante ${integrante.id_estudante} cadastrado no grupo ${idGrupo}`)
							}
						}

					}
				}
			} catch (e) {
				error("Erro ao cadastrar Item da atividade: ", e)
				const errorMessage = typeof e === 'string' ? e : e.message

				if (errorMessage.includes("Dados obrigatórios não foram preenchidos.")) {
					return fail(401, "Dados obrigatórios não foram preenchidos.")
				} else {
					return fail(401, errorMessage)
				}
			}
		}

		cookies.set("atividade", "", { path: "/" })
		cookies.set("item_atividade", "", { path: "/" })
		cookies.set("etapas", "", { path: "/" })
		cookies.set("toast", 'atividade_criada', { path: "/" })
		// if (cookies.get("toast") != "atividade_criada") {
		// 	cookies.set("toast", 'etapas_criadas', { path: "/" })
		// }

		const url = `/professor/turmas/${params.id}/atividades/`
		debug(`atividades/create/etapas/resumo/+page.server.js redirect to ${url}`)
		redirect(300, url)
	}
}
