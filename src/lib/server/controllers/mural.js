import { criaPublicacaoBD, getPublicacoesByIdTurmaBD } from "../repositories/mural"

export async function getPublicacoesByIdTurma(idTurma) {
	let res = await getPublicacoesByIdTurmaBD(idTurma)
	return res.rows
}

export async function criaPublicacao(idTurma, idUsuario, textoPublicacao, anexos) {
	const anexosData = [];

	for (const arquivo of anexos) {
		const buffer = await arquivo.arrayBuffer();
		anexosData.push({
			nome: arquivo.name,
			tipo: arquivo.type,
			tamanho: arquivo.size,
			conteudo: Buffer.from(buffer) // para salvar binário
			// conteudo: new Uint8Array(buffer)
		});

	}

	await criaPublicacaoBD(idTurma, idUsuario, textoPublicacao, anexosData)

	return true
}
