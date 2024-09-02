import { test } from "vitest";
import { loginUser, registerNewUser, removeUserByLogin } from "./auth";
import { registraTurma } from "./turma";
import { findUserByLogin } from "../repositories/auth";

test("Cria usuário e turma de exemplos (vini)", async () => {
	let userId;
	try {
		let res = await registerNewUser('Vinícius Pessoa', 'ViniPessoa8', 'Senhavalida!1', 'UEA', '1999-12-06', 'Sou estudante de SI', "vcbp.snf18@uea.edu.br", "1811440260")
		userId = res.id
	} catch (e) {
		console.log("Criação do user admin (vini):", e)
		try {
			let res = await findUserByLogin('ViniPessoa8')
			userId = res.id
		} catch (e) {
			console.log("Criação do user admin login (vini):", e)
		}
	}

	try {

		let res = await registraTurma("COD-TESTE-01", "Matéria_teste", "Nome da Turma", "descricao da turma", 2024, 1, "sala A24", "UFAM", userId)
		let res2 = await registraTurma("COD-TESTE-02", "Matéria_teste 2", "Nome da Turma 2", "descricao da turma 2", 2024, 2, "sala A25", "UFAM", userId)
		let res3 = await registraTurma("COD-TESTE-03", "Matéria_teste 3", "Nome da Turma 3", "descricao da turma 3", 2024, 2, "sala A26", "UFAM", userId)
		console.log(res)
		console.log(res2)
		console.log(res3)
	} catch (e) {
		console.log("Criação da turma (vini):", e)
	}

})
test("Cria usuário válido", async () => {
	await registerNewUser('Nome Completo', 'login123', 'Senhavalida!1', 'UEA', '2024-08-21', 'bio', "email@uea.edu.br", "1811440260")
})

test.fails("Falha ao criar usuário com dados faltando", async () => {

	let res = await registerNewUser('Nome Completo', '', 'Senhavalida!1', 'UEA', '2024-08-21', 'bio', "email@uea.edu.br", "1811440260")
})

test.fails("Falha ao criar usuário duplicado", async () => {
	await registerNewUser('Nome Completo', 'login123', 'Senhavalida!1', 'UEA', '2024-08-21', 'bio', "email@uea.edu.br", "1811440260")
})

test.fails("Falha ao logar com senha incorreto", async () => {
	await loginUser("login123", "Senhavalida!2")
})

test.fails("Falha ao logar sem usuário", async () => {
	await loginUser("", "Senhavalida!2")
})

test.fails("Falha ao logar sem senha", async () => {
	await loginUser("login123", "")
})

test("Loga com usuário criado", async () => {
	await loginUser("login123", "Senhavalida!1")
})

test("Remove usuário criado", async () => {
	await removeUserByLogin("login123")
})

