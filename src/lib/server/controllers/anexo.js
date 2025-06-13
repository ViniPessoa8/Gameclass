import { listaAnexosPorIdEntregaBD, listaAnexosPorIdPublicacaoMuralBD } from "../repositories/anexo"

export default class AnexoController {
	async listaPorIdEntrega(idEntrega) {
		let res = await listaAnexosPorIdEntregaBD(idEntrega)
		return res.rows
	}

	async listaPorIdPublicacaoMural(idPublicacaoMural) {
		let res = await listaAnexosPorIdPublicacaoMuralBD(idPublicacaoMural)
		return res.rows
	}

}
