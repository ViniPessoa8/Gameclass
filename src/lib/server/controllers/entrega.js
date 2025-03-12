import { listaEntregasPorItemAtividadeIdBD, buscaEntregaPorIdBD } from "../repositories/entrega"

export async function listaEntregasPorItemAtividadeId(idItemAtividade) {
	let res = await listaEntregasPorItemAtividadeIdBD(idItemAtividade)

	return res.rows
}

export async function buscaEntregaPorId(idEntrega) {
	let res = await buscaEntregaPorIdBD(idEntrega)

	return res.rows[0]
}
