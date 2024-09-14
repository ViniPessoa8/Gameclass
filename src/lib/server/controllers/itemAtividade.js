import { cadastraItemAtividadeBD } from "../repositories/itemAtividade";

export async function cadastraItemAtividade(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividadePai) {
	if (!titulo || !notaMax || !dataEntregaInicial || !dataEntregaFinal || !tipoAtribuicaoNota || idAtividadePai <= 0) {
		throw ("Dados obrigatórios não foram preenchidos.")
	}

	try {
		let res = await cadastraItemAtividadeBD(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividadePai);

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

export async function removeItemAtividadePorId(idItemAtividade) {

}

export async function removeItemAtividadePorTitulo(titulo, idAtividadePai) {

}
