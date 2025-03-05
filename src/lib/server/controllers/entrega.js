import { listaEntregasPorItemAtividadeIdBD } from "../repositories/entrega"

export async function listaEntregasPorItemAtividadeId(idItemAtividade) {
	let res = await listaEntregasPorItemAtividadeIdBD(idItemAtividade)

	if (res.rowCount === 0) {
		throw ("Não foi encontrada entrega para o item de atividade informado.")
	}

	return res.rows
}
