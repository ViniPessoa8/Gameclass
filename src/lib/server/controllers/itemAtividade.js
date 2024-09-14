import { cadastraItemAtividadeBD, listaItensDaAtividadeBD, listaItensDaAtividadePorIdBD, removeItemAtividadePorIdBD, removeItemAtividadePorTituloBD } from "../repositories/itemAtividade";

export async function cadastraItemAtividade(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividadePai) {

	if (!titulo || !notaMax || !dataEntregaInicial || !dataEntregaFinal || !tipoAtribuicaoNota || idAtividadePai <= 0) {
		throw ("Dados obrigatórios não foram preenchidos. (Item Atividade)")
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

export async function listaItensDaAtividadePorId(idAtividadePai) {
	if (!idAtividadePai) {
		throw ("Dados obrigatórios não foram preenchidos. (listaItensDaAtividadePorId)")
	}

	let res = await listaItensDaAtividadePorIdBD(idAtividadePai);
	return res

}


export async function removeItemAtividadePorId(idItemAtividade) {
	if (!idItemAtividade) {
		throw ("Dados obrigatórios não foram preenchidos. (RemoveItemAtividadePorId)")
	}

	let res = await removeItemAtividadePorIdBD(idItemAtividade);
	if (res.rowCount > 0) {
		return res.rows
	}
}

export async function removeItemAtividadePorTitulo(titulo, idAtividadePai) {
	if (!titulo || !idAtividadePai) {
		throw ("Dados obrigatórios não foram preenchidos. (RemoveItemAtividadePorTitulo)")
	}

	let res = await removeItemAtividadePorTituloBD(titulo, idAtividadePai);
	if (res.rowCount > 0) {
		return res.rows
	}
}
