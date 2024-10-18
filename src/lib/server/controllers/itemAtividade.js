import { buscaItemAtividadePorIdBD, buscaItemAtividadePorTituloBD, cadastraItemAtividadeBD, listaItensDaAtividadePorIdBD, removeItemAtividadePorIdBD, } from "../repositories/itemAtividade";
import { cadastraCriterioBD } from "../repositories/criterio";
import { removeCriterioPorIdItemAtividade } from "./criterio";

export async function cadastraItemAtividade(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo = 0, nMaxGrupos = 0, idAtividadePai, criterios) {
	let res

	if (!titulo || !notaMax || !dataEntregaInicial || !dataEntregaFinal || ![0, 1].includes(tipoAtribuicaoNota) || idAtividadePai <= 0 || !criterios) {
		throw ("Dados obrigatórios não foram preenchidos. (Item Atividade)")
	}

	try {
		res = await cadastraItemAtividadeBD(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividadePai);
	} catch (e) {
		if (e.includes("duplicate key value violates unique constraint")) {
			throw ("Esta etapa ja existe nessa atividade.")
		}
		throw e;
	}

	let idItemAtividade = res.rows[0].id

	criterios.forEach(async (c) => {
		try {
			await cadastraCriterioBD(c.titulo, c.nota_max, c.peso, idItemAtividade)
		} catch (e) {
			throw ("Erro ao cadastrar criterio: ", e)
		}

	})

	if (res.rowCount > 0) {
		return res.rows
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

	removeCriterioPorIdItemAtividade(idItemAtividade)

	let res = await removeItemAtividadePorIdBD(idItemAtividade);
	if (res.rowCount > 0) {
		return res.rows
	}
}
