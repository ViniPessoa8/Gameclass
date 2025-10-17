import Anexo from "../../models/Anexo";
import { listaAnexosPorIdEntregaBD, listaAnexosPorIdPublicacaoMuralBD } from "../repositories/anexo"
import { log, info, error, debug } from "$lib/utils/logger"

export default class AnexoController {
	async listaPorIdEntrega(idEntrega) {
		log(`AnexoController -> listaPorIdEntrega(${idEntrega})`)
		let res = await listaAnexosPorIdEntregaBD(idEntrega)
		return res.rows.map((row) => new Anexo(row));
	}

	async listaPorIdPublicacaoMural(idPublicacaoMural) {
		log(`AnexoController -> listaPorIdPublicacaoMural(${idPublicacaoMural})`)
		let res = await listaAnexosPorIdPublicacaoMuralBD(idPublicacaoMural)
		return res.rows.map((row) => new Anexo(row));
	}

}
