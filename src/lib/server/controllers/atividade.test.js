import { cadastraAtividade, getAtividadeById, getAtividadeByTitulo, removeAtividade } from "./atividade";
import { afterAll, expect, test } from "vitest";

let prazo = new Date("2024-09-12T16:20");
let id_turma = 1;
let id_atividade;

test.sequential("Cadastro atividade", async () => {
	let res = await cadastraAtividade("Nome da atividade", "descricao", prazo, id_turma)
	console.log(res)
	id_atividade = res[0].id
})


test("Buscar Atividade por id", async () => {
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

test("Buscar Atividade por titulo", async () => {
	const template_resultado = {
		"descricao": "descricao",
		"id": id_atividade,
		"id_turma": 1,
		"prazo": "Thu Sep 12 2024 16:20:00 GMT-0400 (Horário Padrão do Amazonas)",
		"titulo": "Nome da atividade",
	}

	let res = await getAtividadeByTitulo("Nome da atividade", id_turma)
	res = res.rows
	res[0].prazo = res[0].prazo.toString()
	expect(res[0]).toMatchObject(template_resultado)
})

test("Buscar Atividade que não existe por id", async () => {
	let res = await getAtividadeById(id_atividade + 1)
	res = res.rows
	expect(res).toMatchObject([])
})

test("Remoção de Atividade", async () => {
	await removeAtividade("Nome da atividade", id_turma)
})

test("Erro ao cadastrar atividade com dados faltando", async () => {
	await expect(() => cadastraAtividade("", "descricao", prazo, id_turma)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
	await expect(() => cadastraAtividade("Nome da atividade", "descricao", prazo)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
	await expect(() => cadastraAtividade("Nome da atividade", "descricao", null, id_turma)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
	await expect(() => cadastraAtividade("descricao", prazo, id_turma)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
	await expect(() => cadastraAtividade("descricao", id_turma)).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
	await expect(() => cadastraAtividade("Nome da atividade", "descricao")).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
	await expect(() => cadastraAtividade("descricao")).rejects.toThrowError("Dados obrigatórios não foram preenchidos")
})

afterAll(() => removeAtividade("Nome da atividade", id_turma))
