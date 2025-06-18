import {
	avaliaEntregaBD,
	alteraAvaliacaoEntregaBD,
	buscaAvaliacaoEntregaBD
} from "../repositories/avaliacao.js";

import Avaliacao from "$lib/models/Avaliacao.js";
import AvaliacaoCriterio from "../../models/AvaliacaoCriterio.js";

export default class AvaliacaoController {
	async avalia(avaliacao) {
		return await avaliaEntregaBD(avaliacao.id_entrega, avaliacao.criterios_avaliados);
	}

	async alteraAvaliacao(avaliacao) {
		return await alteraAvaliacaoEntregaBD(avaliacao.id_entrega, avaliacao.criterios_avaliados);
	}

	async buscaPorIdEntrega(idEntrega) {
		const rows = await buscaAvaliacaoEntregaBD(idEntrega);
		if (!rows.length) return null;

		const id_entrega = rows[0].id_entrega;
		const id_realizar_avaliacao = rows[0].id_realizar_avaliacao;

		const criterios_avaliados = rows
			.filter(row => row.id_avaliacao_criterio)
			.map(row => new AvaliacaoCriterio({
				id: row.id_avaliacao_criterio,
				nota_atribuida: row.nota_atribuida,
				id_realizar_avaliacao: row.id_realizar_avaliacao,
				id_criterio: row.id_criterio
			}));

		const avaliacao = new Avaliacao({
			id: id_realizar_avaliacao,
			id_entrega,
			criterios_avaliados
		});

		return avaliacao;
	}
}
