import {
	listaEntregasPorItemAtividadeIdBD,
	buscaEntregaPorIdBD,
	listaNotasObtidasDeCriteriosPorIdEntregaBD,
	listaNotasObtidasDeCriteriosIntegrantePorIdEntregaBD
} from "../repositories/entrega.js";

import Entrega from "$lib/models/Entrega.js";

export default class EntregaController {
	async listaPorItemAtividade(idItemAtividade) {
		const res = await listaEntregasPorItemAtividadeIdBD(idItemAtividade);
		return res.rows.map(row => new Entrega(row).toObject());
	}

	async buscaPorId(idEntrega) {
		const res = await buscaEntregaPorIdBD(idEntrega);
		if (res.rowsCount == 0) return null;
		return new Entrega(res.rows[0]);
	}

	async listaNotasObtidasDeCriterios(idEntrega) {
		const res = await listaNotasObtidasDeCriteriosPorIdEntregaBD(idEntrega);
		return res;
	}

	async listaNotasObtidasDeCriteriosIntegrante(idEntrega, idIntegrante) {
		const res = await listaNotasObtidasDeCriteriosIntegrantePorIdEntregaBD(idEntrega, idIntegrante);
		return res;
	}
}
