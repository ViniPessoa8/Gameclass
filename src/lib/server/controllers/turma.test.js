import { test, expect } from "vitest"
import { deleteTurmaByCodigo, getTurmaByCodigo, registraTurma } from "./turma"

const turma_exemplo = {
	codigo: "COD-TURMA-01",
	disciplina: "Matemática",
	nome: "Matemáticos de Plantão",
	descricao: "turma top de matemática",
	ano: 2024,
	periodo: 1,
	local: "Sala A24",
	instituicao: "UFAM",
	professorId: 1,
}

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

test("Falha ao buscar turma inexistente", async () => {
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
