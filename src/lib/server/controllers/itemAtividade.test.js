import { afterAll, beforeAll, describe, test } from "vitest";
import { cadastraAtividade, removeAtividade } from "./atividade";
import { cadastraItemAtividade } from "./itemAtividade";
import { ATRIBUICAO } from "../../constants";

describe("Criação de Itens da atividade (Etapas)", () => {

	let idAtividade
	let idTurma = 1
	let prazo = new Date("2024-09-12T16:20");

	beforeAll(async () => {
		let res = await cadastraAtividade("turma_teste_item_atividade", "descricao", prazo, idTurma)
		idAtividade = res[0].id
	})

	afterAll(() => removeAtividade("turma_teste_item_atividade", idTurma))

	test("Cria Item da atividade", () => {
		cadastraItemAtividade(
			"Nome do item da atividade",
			10.0,
			new Date("2024-09-12T16:20"),
			new Date("2024-09-19T16:20"),
			ATRIBUICAO.media_simples,
			false,
			false,
			null,
			null,
			idAtividade
		)
	})
})
