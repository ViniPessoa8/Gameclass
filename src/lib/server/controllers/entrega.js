import {
	listaEntregasPorItemAtividadeIdBD,
	buscaEntregaPorIdBD,
	listaNotasObtidasDeCriteriosPorIdEntregaBD,
	listaNotasObtidasDeCriteriosIntegrantePorIdEntregaBD
} from "../repositories/entrega.js";
import { log, info, error, debug } from "$lib/utils/logger"

import Entrega from "$lib/models/Entrega.js";

export default class EntregaController {
	async listaPorItemAtividade(idItemAtividade) {
		log(`EntregaController -> listaPorItemAtividade(${idItemAtividade})`)
		const res = await listaEntregasPorItemAtividadeIdBD(idItemAtividade);
		return res.rows.map(row => new Entrega(row).toObject());
	}

	async buscaPorId(idEntrega) {
		log(`EntregaController -> buscaPorId(${idEntrega})`)
		const res = await buscaEntregaPorIdBD(idEntrega);
		if (res.rowsCount == 0) return null;
		return new Entrega(res.rows[0]);
	}

	async listaNotasObtidasDeCriterios(idEntrega) {
		log(`EntregaController -> listaNotasObtidasDeCriterios(${idEntrega})`)
		const res = await listaNotasObtidasDeCriteriosPorIdEntregaBD(idEntrega);
		return res;
	}

	async listaNotasObtidasDeCriteriosIntegrante(idEntrega, idIntegrante) {
		log(`EntregaController -> listaNotasObtidasDeCriteriosIntegrante(${idEntrega}, ${idIntegrante})`)
		const res = await listaNotasObtidasDeCriteriosIntegrantePorIdEntregaBD(idEntrega, idIntegrante);
		return res;
	}
}
