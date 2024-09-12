import { cadastraAtividade, removeAtividade } from "./atividade";
import { expect, test } from "vitest";

let prazo = new Date("2024-09-12T16:20");
let id_turma = 1;

test("Cadastro atividade", () => {
	cadastraAtividade("Nome da atividade", "descricao", prazo, id_turma)
})

test("Remoção de Atividade", () => {
	removeAtividade("Nome da atividade", id_turma)
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
