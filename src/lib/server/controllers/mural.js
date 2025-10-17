import { criaPublicacaoBD, buscaPorIdTurmaBD } from "../repositories/mural"
import { log } from "$lib/utils/logger"

export default class MuralController {
	async buscaPorIdTurma(idTurma) {
		log(`MuralController -> buscaPorIdTurma(${idTurma})`)
		let res = await buscaPorIdTurmaBD(idTurma)
		return res.rows
	}

	async criaPublicacao(idTurma, idUsuario, textoPublicacao, anexos) {
		log(`MuralController -> criaPublicacao(${idTurma}, ${idUsuario}, ${textoPublicacao}, ${anexos})`)
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

}
