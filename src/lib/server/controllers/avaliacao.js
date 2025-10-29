import {
	avaliaEntregaBD,
	alteraAvaliacaoEntregaBD,
	buscaAvaliacaoEntregaBD,
	avaliaIntegranteGrupoBD,
	buscaAvaliacaoIntegrantesBD,
	buscaPorEstudanteItemAtividadeBD
} from "../repositories/avaliacao.js";

import Avaliacao from "$lib/models/Avaliacao.js";
import AvaliacaoCriterio from "../../models/AvaliacaoCriterio.js";
import { log, info, error, debug } from "$lib/utils/logger"

export default class AvaliacaoController {
	async avalia(avaliacao) {
		log(`AvaliacaoController -> avalia(${avaliacao})`)
		return await avaliaEntregaBD(avaliacao.id_entrega, avaliacao.criterios_avaliados);
	}

	async alteraAvaliacao(avaliacao, idIntegrante) {
		log(`AvaliacaoController -> alteraAvaliacao(${avaliacao}, ${idIntegrante})`)
		const res = await alteraAvaliacaoEntregaBD(avaliacao.id_entrega, avaliacao.criterios_avaliados, idIntegrante);

		return res
	}

	async buscaPorIdEntrega(idEntrega) {
		log(`AvaliacaoController -> buscaPorIdEntrega(${idEntrega})`)
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

	async avaliaIntegranteGrupo(idEntrega, idEstudante, criteriosAvaliados) {
		log(`AvaliacaoController -> avaliaIntegranteGrupo(${idEntrega}, ${idEstudante}, ${criteriosAvaliados})`)
		return await avaliaIntegranteGrupoBD(idEntrega, idEstudante, criteriosAvaliados);
	}

	async buscaAvaliacaoIntegrantes(idEntrega) {
		log(`AvaliacaoController -> buscaAvaliacaoIntegrantes(${idEntrega})`)
		return await buscaAvaliacaoIntegrantesBD(idEntrega);
	}

	async buscaPorEstudanteItemAtividade(idEstudante, idItemAtividade) {
		log(`AvaliacaoController -> buscaPorEstudanteItemAtividade(${idEstudante}, ${idItemAtividade})`)
		return await buscaPorEstudanteItemAtividadeBD(idEstudante, idItemAtividade);
	}
}
