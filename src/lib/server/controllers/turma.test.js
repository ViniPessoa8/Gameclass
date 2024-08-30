import { test, expect } from "vitest"
import { registraTurma } from "./turma"

test("Cria nova turma", async () => {
	await registraTurma("COD-TURMA-01", "Matemática", "Matemáticos de Plantão", 2024, 1, "Sala A24", "UFAM")
})
