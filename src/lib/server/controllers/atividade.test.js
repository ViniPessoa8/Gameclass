import { cadastraAtividade, getAtividadeById, getAtividadeByTitulo, removeAtividade } from "./atividade";
import { afterAll, describe, expect, test } from "vitest";

let prazo = new Date("2024-09-12T16:20");
let id_turma = 1;
let id_atividade;

describe.sequential("Cadastro de Atividade", () => {
	test.sequential("Cadastra atividade", async () => {
		let res = await cadastraAtividade("Nome da atividade", "descricao", prazo, id_turma)
		id_atividade = res[0].id
	})

	test.sequential("Erro ao cadastrar atividade com dados faltando", async () => {
		await expect(() => cadastraAtividade("", "descricao", prazo, id_turma)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
		await expect(() => cadastraAtividade("Nome da atividade", "descricao", prazo)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
		await expect(() => cadastraAtividade("Nome da atividade", "descricao", null, id_turma)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
		await expect(() => cadastraAtividade("descricao", prazo, id_turma)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
		await expect(() => cadastraAtividade("descricao", id_turma)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
		await expect(() => cadastraAtividade("Nome da atividade", "descricao")).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
		await expect(() => cadastraAtividade("descricao")).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
	})
})

describe.sequential("Buscar de Atividade", () => {
	test("Por ID", async () => {
		const template_resultado = {
			"descricao": "descricao",
			"id": id_atividade,
			"id_turma": 1,
			"prazo": "Thu Sep 12 2024 16:20:00 GMT-0400 (Horário Padrão do Amazonas)",
			"titulo": "Nome da atividade",
		}

		let res = await getAtividadeById(id_atividade)
		res = res.rows
		res[0].prazo = res[0].prazo.toString()
		expect(res[0]).toMatchObject(template_resultado)

	})

	test("Por titulo", async () => {
		const template_resultado = {
			"descricao": "descricao",
			"id": id_atividade,
			"id_turma": 1,
			"prazo": "Thu Sep 12 2024 16:20:00 GMT-0400 (Horário Padrão do Amazonas)",
			"titulo": "Nome da atividade",
		}

		let res = await getAtividadeByTitulo("Nome da atividade", id_turma)
		if (!res) {
			throw ("Não foi encontrada atividade com o titulo 'Nome da atividade' na turma ", id_turma)
		}
		res.prazo = res.prazo.toString()
		expect(res).toMatchObject(template_resultado)
	})

	test("Erro ao buscar Atividade que não existe por id", async () => {
		await expect(getAtividadeById(id_atividade + 1)).rejects.toThrowError("Não foi encontrada atividade com esse id.")
	})
})

test.sequential("Remoção de Atividade", async () => {
	await removeAtividade("Nome da atividade", id_turma)
})

afterAll(() => removeAtividade("Nome da atividade", id_turma))
