import { buscaItemAtiv, buscaItemAtividadePorIdBD, buscaItemAtividadePorTituloBD, cadastraItemAtividadeBD, listaItensDaAtividadeBD, listaItensDaAtividadePorIdBD, removeItemAtividadePorIdBD, removeItemAtividadePorTituloBD } from "../repositories/itemAtividade";

export async function cadastraItemAtividade(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo = 0, nMaxGrupos = 0, idAtividadePai) {

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


export async function buscaItemAtividadePorId(idItemAtividade) {
	if (!idItemAtividade) {
		throw ("Dados obrigatórios não foram preenchidos. (buscaItemAtividadePorId)")
	}

	let res = await buscaItemAtividadePorIdBD(idItemAtividade);
	return res
}

export async function buscaItemAtividadePorTitulo(titulo, idAtividadePai) {
	if (!titulo || !idAtividadePai) {
		throw ("Dados obrigatórios não foram preenchidos. (buscaItemAtividadePorTitulo)")
	}

	let res = await buscaItemAtividadePorTituloBD(titulo, idAtividadePai);
	return res
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
