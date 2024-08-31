import { test, expect } from "vitest"
import { deleteTurmaByCodigo, getTurmaByCodigo, registraTurma } from "./turma"

const turma_exemplo = {
	codigo: "COD-TURMA-01",
	disciplina: "Matemática",
	nome: "Matemáticos de Plantão",
	ano: 2024,
	periodo: 1,
	local: "Sala A24",
	instituicao: "UFAM"
}

test("Cria nova turma", async () => {
	let res = await registraTurma(turma_exemplo.codigo, turma_exemplo.disciplina, turma_exemplo.nome, turma_exemplo.ano, turma_exemplo.periodo, turma_exemplo.local, turma_exemplo.instituicao)
	expect(res.id).toBeTruthy()
	turma_exemplo.id = res.id
})

test("Busca turma criada, por código", async () => {
	const exemplo_resposta = {
		codigo: turma_exemplo.codigo,
		disciplina: turma_exemplo.disciplina,
		nome: turma_exemplo.nome,
		ano: turma_exemplo.ano,
		periodo: turma_exemplo.periodo,
		id: turma_exemplo.id,
		id_instituicao: 2,
		local: turma_exemplo.local,
	}
	let res = await getTurmaByCodigo(turma_exemplo.codigo)
	expect(res).toStrictEqual(exemplo_resposta)
})

test("Remove turma criada", async () => {
	let res = await deleteTurmaByCodigo(turma_exemplo.codigo)
	expect(res.id).toBe(turma_exemplo.id)
})
