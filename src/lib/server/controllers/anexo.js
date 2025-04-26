import { listaAnexosPorIdEntregaBD, listaAnexosPorIdPublicacaoMuralBD } from "../repositories/anexo"

export async function listaAnexosPorIdEntrega(idEntrega) {
	let res = await listaAnexosPorIdEntregaBD(idEntrega)
	return res.rows
}

export async function listaAnexosPorIdPublicacaoMural(idPublicacaoMural) {
	let res = await listaAnexosPorIdPublicacaoMuralBD(idPublicacaoMural)
	return res.rows
}
