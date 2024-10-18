import { afterAll, beforeAll, describe, test } from "vitest";
import { cadastraAtividade, removeAtividade } from "./atividade";
import { removeCriterioPorIdItemAtividade } from "./criterio";
import { buscaItemAtividadePorId, buscaItemAtividadePorTitulo, cadastraItemAtividade, listaItensDaAtividadePorId, removeItemAtividadePorId } from "./itemAtividade";
import { ATRIBUICAO } from "../../constants";

let idAtividadePai
let idTurma = 1
let idItemAtividade, idItemAtividade2
let prazo = new Date("2024-09-12T16:20");
let criterios = [
	{
		titulo: "Formatação",
		nota_max: 4.0
	},
	{
		titulo: "Conteúdo",
		nota_max: 6.0
	},
]

beforeAll(async () => {
	let res = await cadastraAtividade("turma_teste_item_atividade", "descricao", prazo, idTurma)
	idAtividadePai = parseInt(res[0].id)
})

afterAll(async () => {
	await removeCriterioPorIdItemAtividade(idItemAtividade)
	await removeCriterioPorIdItemAtividade(idItemAtividade2)
	await removeAtividade("turma_teste_item_atividade", idTurma)

})

describe.sequential("Criação de Itens da atividade (Etapas)", () => {
	test.sequential("Cria Item da atividade", async () => {
		let res = await cadastraItemAtividade(
			"Nome do item da atividade",
			10.0,
			new Date("2024-09-12T16:20"),
			new Date("2024-09-19T16:20"),
			ATRIBUICAO.media_simples,
			false,
			false,
			null,
			null,
			idAtividadePai,
			criterios
		)

		idItemAtividade = res[0].id
	})

	test.sequential("Cria Item da atividade 2", async () => {
		let res = await cadastraItemAtividade(
			"Nome do item da atividade 2",
			10.0,
			new Date("2024-09-12T16:20"),
			new Date("2024-09-19T16:20"),
			ATRIBUICAO.media_simples,
			false,
			false,
			null,
			null,
			idAtividadePai,
			criterios
		)

		idItemAtividade2 = res[0].id
	})

	test.sequential("Busca item da atividade por id", async () => {
		await buscaItemAtividadePorId(idItemAtividade)
		// TODO: Adicinar checagem do objeto resposta
	})

	test.sequential("Busca item da atividade por titulo", async () => {
		await buscaItemAtividadePorTitulo("Nome do item da atividade", idAtividadePai)
		// TODO: Adicinar checagem do objeto resposta
	})

	test.sequential("Lista itens da atividade", async () => {
		await listaItensDaAtividadePorId(idAtividadePai)
	})

	test.sequential("Remove item da atividade por ID", async () => {
		await removeItemAtividadePorId(idItemAtividade)
	})

	test.sequential("Remove item da atividade por Titulo", async () => {
		let itemAtividade2 = await buscaItemAtividadePorTitulo("Nome do item da atividade 2", idAtividadePai)
		await removeItemAtividadePorId(itemAtividade2.id)
	})

})
