import Anexo from "../../models/Anexo";
import { listaAnexosPorIdEntregaBD, listaAnexosPorIdPublicacaoMuralBD } from "../repositories/anexo"

export default class AnexoController {
	async listaPorIdEntrega(idEntrega) {
		let res = await listaAnexosPorIdEntregaBD(idEntrega)
		return res.rows.map((row) => new Anexo(row));
	}

	async listaPorIdPublicacaoMural(idPublicacaoMural) {
		let res = await listaAnexosPorIdPublicacaoMuralBD(idPublicacaoMural)
		return res.rows.map((row) => new Anexo(row));
	}

}
