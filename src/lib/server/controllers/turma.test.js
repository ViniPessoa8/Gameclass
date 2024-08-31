import { test, expect } from "vitest"
import { getTurmaByCodigo, registraTurma } from "./turma"

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
	await registraTurma("COD-TURMA-01", "Matemática", "Matemáticos de Plantão", 2024, 1, "Sala A24", "UFAM")
})

test("Busca turma criada, por código", async () => {
	const exemplo_resposta = {
		codigo: "COD-TURMA-01",
		disciplina: "Matemática",
		nome: "Matemáticos de Plantão",
		ano: 2024,
		periodo: 1,
		id: 1,
		id_instituicao: 2,
		local: "Sala A24",
	}
	let res = await getTurmaByCodigo("COD-TURMA-01")
	expect(res).toStrictEqual(exemplo_resposta)

})
