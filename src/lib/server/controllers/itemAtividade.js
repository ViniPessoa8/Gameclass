import { buscaItemAtividadePorIdBD, buscaItemAtividadePorTituloBD, cadastraItemAtividadeBD, listaItensDaAtividadePorIdBD, removeItemAtividadePorIdBD, listaCriteriosPorIdItemAtividadeBD } from "../repositories/itemAtividade";
import { cadastraCriterioBD } from "../repositories/criterio";
import { removeCriterioPorIdItemAtividade } from "./criterio";
import { STATUS_ITEM_ATIVIDADE_PROFESSOR } from "../../constants";

export async function cadastraItemAtividade(titulo, descricao = '', notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo = 0, nMaxGrupos = 0, idAtividadePai, criterios, status = 1) {
	let res

	if (!titulo || !notaMax || !dataEntregaInicial || !dataEntregaFinal || ![0, 1].includes(tipoAtribuicaoNota) || idAtividadePai <= 0 || !criterios) {
		throw ("Dados obrigatórios não foram preenchidos. (Item Atividade)")
	}

	try {
		res = await cadastraItemAtividadeBD(titulo, descricao, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividadePai, status);
	} catch (e) {
		if (e.includes("duplicate key value violates unique constraint")) {
			throw ("Esta etapa ja existe nessa atividade.")
		}
		throw e;
	}

	let idItemAtividade = res.rows[0].id

	criterios.forEach(async (c) => {
		try {
			await cadastraCriterioBD(c.titulo, c.descricao, c.nota_max, c.peso, idItemAtividade)
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

	const status = calculaStatusItemAtividade(res)
	res["status"] = status

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

function calculaStatusItemAtividade(itemAtividade) {
	let status = ""

	// itemAtividade["entregue"] = buscaEntregaItemAtividade()

	if (itemAtividade.data_entrega_inicial == undefined) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR["0"];

	} else if (itemAtividade.data_entrega_inicial != undefined
		&& itemAtividade.data_entrega_inicial > new Date()) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR["1"];

	} else if (itemAtividade.data_entrega_inicial != undefined
		&& itemAtividade.data_entrega_inicial <= new Date()) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR["2"];

	} else if (itemAtividade.entregue == true
		&& itemAtividade.nota == undefined) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR["3"];

	} else if (itemAtividade.entregue == true
		&& itemAtividade.nota != undefined) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR["4"];
	}
}

export async function listaCriteriosPorIdItemAtividade(idItemAtividade) {
	console.debug(`listaCriteriosPorIdItemAtividade(${idItemAtividade})`)
	if (!idItemAtividade) {
		throw ("Dados obrigatórios não foram preenchidos. (listaCriteriosPorIdItemAtividade)")
	}

	let res = await listaCriteriosPorIdItemAtividadeBD(idItemAtividade);
	return res
}

