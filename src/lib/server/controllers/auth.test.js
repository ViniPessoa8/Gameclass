import { test } from "vitest";
import { loginUser, registerNewUser, removeUserByLogin } from "./auth";

test("Cria usuário válido", async () => {
	await registerNewUser('Nome Completo', 'login123', 'Senhavalida!1', 'UEA', '2024-08-21', 'bio', "email@uea.edu.br", "1811440260")
})

test.fails("Falha ao criar usuário com dados faltando", async () => {
	await registerNewUser('Nome Completo', '', 'Senhavalida!1', 'UEA', '2024-08-21', 'bio', "email@uea.edu.br", "1811440260")
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

