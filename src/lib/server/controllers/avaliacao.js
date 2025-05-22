import {
	avaliaEntregaBD,
	alteraAvaliacaoEntregaBD,
	buscaAvaliacaoEntregaBD
} from "../repositories/avaliacao.js";

import Avaliacao from "$lib/models/Avaliacao.js";
import AvaliacaoCriterio from "../../models/AvaliacaoCriterio.js";

export default class AvaliacaoController {
	async avaliar(idEntrega, criteriosAvaliados) {
		// criteriosAvaliados deve ser array de AvaliacaoCriterio ou objetos equivalentes
		const sucesso = await avaliaEntregaBD(idEntrega, criteriosAvaliados);
		return sucesso;
	}

	async alterarAvaliacao(idEntrega, criteriosAvaliados) {
		const sucesso = await alteraAvaliacaoEntregaBD(idEntrega, criteriosAvaliados);
		return sucesso;
	}

	async buscarAvaliacao(idEntrega) {
		const rows = await buscaAvaliacaoEntregaBD(idEntrega);
		if (!rows.length) return null;

		const id_entrega = rows[0].id_entrega;
		const id_realizar_avaliacao = rows[0].id_realizar_avaliacao;

		const criterios_avaliados = rows
			.filter(row => row.id_avaliacao_criterio) // ignora se ainda não houver critérios
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
