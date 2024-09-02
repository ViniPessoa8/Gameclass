import { test, expect, afterAll } from "vitest"
import { registerNewUser, removeUserByLogin } from "./auth";
import { deleteTurmaByCodigo, getTurmaByCodigo, getTurmasByIdProfessor, registraTurma } from "./turma"

let id_usuario_exemplo;
let turma_exemplo;

afterAll(async () => {
	await removeUserByLogin("conta_exemplo_turmas")
})

test("Cria usuário de exemplo pros testes de Turma", async () => {
	let res = await registerNewUser('Nome Completo', 'conta_exemplo_turmas', 'Senhavalida!1', 'UEA', '2024-08-21', 'bio', "email@uea.edu.br", "1811440260")
	id_usuario_exemplo = res[0].id
	turma_exemplo = {
		codigo: "COD-TURMA-01",
		disciplina: "Matemática",
		nome: "Matemáticos de Plantão",
		descricao: "turma top de matemática",
		ano: 2024,
		periodo: 1,
		local: "Sala A24",
		instituicao: "UFAM",
		professorId: id_usuario_exemplo,
	}
})


test("Cria nova turma", async () => {
	let res = await registraTurma(
		turma_exemplo.codigo,
		turma_exemplo.disciplina,
		turma_exemplo.nome,
		turma_exemplo.descricao,
		turma_exemplo.ano,
		turma_exemplo.periodo,
		turma_exemplo.local,
		turma_exemplo.instituicao,
		turma_exemplo.professorId
	)
	expect(res.id).toBeTruthy()
	turma_exemplo.id = res.id
})

test("Falha ao criar turma repetida", async () => {
	try {
		await registraTurma(
			turma_exemplo.codigo,
			turma_exemplo.disciplina,
			turma_exemplo.nome,
			turma_exemplo.descricao,
			turma_exemplo.ano,
			turma_exemplo.periodo,
			turma_exemplo.local,
			turma_exemplo.instituicao,
			turma_exemplo.professorId
		)
	} catch (e) {
		expect(e.status).toBe(409)
		expect(e.body.already_registered).toBeTruthy()
	}
})

test("Busca turma criada, por código", async () => {
	const exemplo_resposta = {
		codigo: turma_exemplo.codigo,
		disciplina: turma_exemplo.disciplina,
		descricao: turma_exemplo.descricao,
		nome: turma_exemplo.nome,
		ano: turma_exemplo.ano,
		periodo: turma_exemplo.periodo,
		id: turma_exemplo.id,
		id_instituicao: 2,
		local: turma_exemplo.local,
		id_professor: turma_exemplo.professorId,
	}
	let res = await getTurmaByCodigo(turma_exemplo.codigo)
	expect(res).toStrictEqual(exemplo_resposta)
})

test("Busca turma criada, por ID do professor", async () => {
	const exemplo_resposta = {
		codigo: turma_exemplo.codigo,
		disciplina: turma_exemplo.disciplina,
		descricao: turma_exemplo.descricao,
		nome: turma_exemplo.nome,
		ano: turma_exemplo.ano,
		periodo: turma_exemplo.periodo,
		id: turma_exemplo.id,
		id_instituicao: 2,
		local: turma_exemplo.local,
		id_professor: turma_exemplo.professorId,
	}
	let res = await getTurmasByIdProfessor(turma_exemplo.professorId)
	expect(res).toStrictEqual(exemplo_resposta)
})

test("Falha ao buscar turma inexistente, por código", async () => {
	let res = await getTurmaByCodigo("-1")
	expect(res).toBe(false)
})

test("Falha ao buscar turma inexistente, por ID do professor", async () => {
	let res = await getTurmaByCodigo("-1")
	expect(res).toBe(false)
})

test("Remove turma criada", async () => {
	let res = await deleteTurmaByCodigo(turma_exemplo.codigo)
	expect(res.id).toBe(turma_exemplo.id)
})

test("Falha ao remover turma inexistente", async () => {
	let res = await deleteTurmaByCodigo(turma_exemplo.codigo)
	expect(res).toBe(false)
})

