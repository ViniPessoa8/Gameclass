import { listaAnexosPorIdEntregaBD } from "../repositories/anexo"

export async function listaAnexosPorIdEntrega(idEntrega) {
	let res = await listaAnexosPorIdEntregaBD(idEntrega)
	return res.rows
}
