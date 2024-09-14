import { cadastraItemAtividadeBD } from "../repositories/itemAtividade";

export async function cadastraItemAtividade(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividade) {
	console.log(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividade)
	console.log(Boolean(!titulo || !notaMax || !dataEntregaInicial || !dataEntregaFinal || !tipoAtribuicaoNota || idAtividade))
	if (!titulo || !notaMax || !dataEntregaInicial || !dataEntregaFinal || !tipoAtribuicaoNota || idAtividade <= 0) {
		console.log(!titulo || !notaMax || !dataEntregaInicial || !dataEntregaFinal || !tipoAtribuicaoNota || idAtividade)
		throw ("Dados obrigatórios não foram preenchidos.")
	}

	try {
		let res = await cadastraItemAtividadeBD(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividade);

		if (res.rowCount > 0) {
			return res.rows
		}
	} catch (e) {
		if (e.includes("duplicate key value violates unique constraint")) {
			throw ("Esta etapa ja existe nessa atividade.")
		}
		throw e;
	}
}
