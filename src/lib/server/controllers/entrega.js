import {
	listaEntregasPorItemAtividadeIdBD,
	buscaEntregaPorIdBD,
	listaNotasDeCriteriosPorIdEntregaBD,
	listaNotasObtidasDeCriteriosPorIdEntregaBD
} from "../repositories/entrega.js";

import Entrega from "$lib/models/Entrega.js";

export default class EntregaController {
	async listarPorItemAtividade(idItemAtividade) {
		const res = await listaEntregasPorItemAtividadeIdBD(idItemAtividade);
		return res.rows.map(row => new Entrega(row).toObject());
	}

	async buscarPorId(idEntrega) {
		const res = await buscaEntregaPorIdBD(idEntrega);
		if (res.rowsCount == 0) return null;
		return new Entrega(res.rows[0]);
	}

	async listarNotasDeCriterios(idEntrega) {
		const res = await listaNotasDeCriteriosPorIdEntregaBD(idEntrega);
		return res.rows;
	}

	async listarNotasObtidasDeCriterios(idEntrega) {
		const res = await listaNotasObtidasDeCriteriosPorIdEntregaBD(idEntrega);
		return res;
	}
}
