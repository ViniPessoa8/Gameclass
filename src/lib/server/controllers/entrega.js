import { listaEntregasPorItemAtividadeIdBD, buscaEntregaPorIdBD, avaliaEntregaBD, buscaAvaliacaoEntregaBD } from "../repositories/entrega"

export async function listaEntregasPorItemAtividadeId(idItemAtividade) {
	let res = await listaEntregasPorItemAtividadeIdBD(idItemAtividade)

	return res.rows
}

export async function buscaEntregaPorId(idEntrega) {
	let res = await buscaEntregaPorIdBD(idEntrega)

	return res.rows[0]
}

export async function avaliaEntrega(idEntrega, notas) {
	let res = await avaliaEntregaBD(idEntrega, notas)

	return res
}

export async function buscaAvaliacaoEntrega(idEntrega) {
	let res = await buscaAvaliacaoEntregaBD(idEntrega)

	return res
}
