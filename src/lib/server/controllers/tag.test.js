import { afterAll, describe, expect, test } from "vitest";
import { cadastraTag, deletaTag } from "./tag";

describe.sequential("Cadastro de Tag", () => {
	test.sequential("Cadastra tag", async () => {
		let res = await cadastraTag("TAG TESTE 1", "FF1166", 1)
	})
})

describe.sequential("Deleta Tag", () => {
	test.sequential("Deleta Tag", async () => {
		let res = await deletaTag("TAG TESTE 1", 1)
	})

	// test.fails("Erro ao deletar Tag inexistente", async () => {
	// 	let res = await deletaTag("TAG TESTE 1", 1)
	// 	console.debug(res)
	// })
})
