import { test } from "vitest";
import { loginUser, registerNewUser, removeUserByLogin } from "./auth";
import { registraTurma } from "./turma";
import { findUserByLogin } from "../repositories/auth";

test.sequential("Cria usuário válido", async () => {
	await registerNewUser('Nome Completo', 'login123', 'Senhavalida!1', 'UEA', '2024-08-21', 'bio', "email@uea.edu.br", "1811440260")
})

test.sequential.fails("Falha ao criar usuário com dados faltando", async () => {

	let res = await registerNewUser('Nome Completo', '', 'Senhavalida!1', 'UEA', '2024-08-21', 'bio', "email@uea.edu.br", "1811440260")
	console.log("Falha ao criar usuário com dados faltando: res: ", res)
})

test.sequential.fails("Falha ao criar usuário duplicado", async () => {
	await registerNewUser('Nome Completo', 'login123', 'Senhavalida!1', 'UEA', '2024-08-21', 'bio', "email@uea.edu.br", "1811440260")
})

test.sequential.fails("Falha ao logar com senha incorreto", async () => {
	await loginUser("login123", "Senhavalida!2")
})

test.sequential.fails("Falha ao logar sem usuário", async () => {
	await loginUser("", "Senhavalida!2")
})

test.sequential.fails("Falha ao logar sem senha", async () => {
	await loginUser("login123", "")
})

test.sequential("Loga com usuário criado", async () => {
	await loginUser("login123", "Senhavalida!1")
})

test.sequential("Remove usuário criado", async () => {
	await removeUserByLogin("login123")
})

