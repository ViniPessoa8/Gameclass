
import { listaComentariosPorIdEntregaBD } from "../repositories/comentario"

export async function listaComentariosPorIdEntrega(idEntrega) {
	let res = await listaComentariosPorIdEntregaBD(idEntrega)
	return res.rows
}
