import {
	buscarItemAtividadePorIdBD,
	buscarItemAtividadePorTituloBD,
	cadastraItemAtividadeBD,
	listaItensDaAtividadePorIdBD,
	removeItemAtividadePorIdBD,
	listaCriteriosPorIdItemAtividadeBD,
	listaNotasDeCriteriosPorIdItemAtividadeBD
} from "../repositories/itemAtividade";


// import { cadastraCriterio, removeCriterioPorIdItemAtividade } from "./criterio";
import { STATUS_ITEM_ATIVIDADE_PROFESSOR } from "../../constants";

import ItemAtividade from "$lib/models/ItemAtividade.js";
import Criterio from "$lib/models/Criterio.js";
import CriterioController from "./criterio";


const criterioController = new CriterioController();

export default class ItemAtividadeController {
	async cadastrar(
		titulo,
		descricao = '',
		notaMax,
		dataEntregaInicial,
		dataEntregaFinal,
		tipoAtribuicaoNota,
		emGrupos,
		receberAposPrazo,
		nIntegrantesGrupo = 0,
		nMaxGrupos = 0,
		idAtividadePai,
		criterios,
		status = 1
	) {
		if (
			!titulo || !notaMax || !dataEntregaInicial || !dataEntregaFinal ||
			![0, 1].includes(tipoAtribuicaoNota) || idAtividadePai <= 0 || !criterios
		) {
			throw "Dados obrigatórios não foram preenchidos. (Item Atividade)";
		}

		let res;
		try {
			res = await cadastraItemAtividadeBD(
				titulo,
				descricao,
				notaMax,
				dataEntregaInicial,
				dataEntregaFinal,
				tipoAtribuicaoNota,
				emGrupos,
				receberAposPrazo,
				nIntegrantesGrupo,
				nMaxGrupos,
				idAtividadePai,
				status
			);
		} catch (e) {
			if (e.includes("duplicate key value violates unique constraint")) {
				throw "Esta etapa já existe nessa atividade.";
			}
			throw e;
		}

		const idItemAtividade = res.rows[0].id;

		for (const c of criterios) {
			try {
				await criterioController.cadastrar(c.titulo, c.descricao, c.nota_max, c.peso, idItemAtividade);
			} catch (e) {
				throw `Erro ao cadastrar critério: ${e}`;
			}
		}

		if (res.rowCount > 0) {
			return res.rows[0].id
		}
	}

	async buscarItemAtividadePorId(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (buscarItemAtividadePorId)";
		}

		const res = await buscarItemAtividadePorIdBD(idItemAtividade);
		res.status = this.calculaStatusItemAtividade(res);

		return new ItemAtividade(res);
	}

	async buscarItemAtividadePorTitulo(titulo, idAtividadePai) {
		if (!titulo || !idAtividadePai) {
			throw "Dados obrigatórios não foram preenchidos. (buscarItemAtividadePorTitulo)";
		}

		const res = await buscarItemAtividadePorTituloBD(titulo, idAtividadePai);
		return res.map((item) => new ItemAtividade(item));
	}

	async listaItensDaAtividadePorId(idAtividadePai) {
		if (!idAtividadePai) {
			throw "Dados obrigatórios não foram preenchidos. (listaItensDaAtividadePorId)";
		}

		const res = await listaItensDaAtividadePorIdBD(idAtividadePai);

		return res.map((item) => {
			item.status = this.calculaStatusItemAtividade(item);
			return new ItemAtividade(item);
		});
	}

	async removeItemAtividadePorId(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (RemoveItemAtividadePorId)";
		}

		await criterioController.removeCriterioPorIdItemAtividade(idItemAtividade);

		const res = await removeItemAtividadePorIdBD(idItemAtividade);
		if (res.rowCount > 0) {
			return res.rows.map((item) => new ItemAtividade(item));
		}
	}

	calculaStatusItemAtividade(itemAtividade) {
		const now = new Date();
		if (!itemAtividade.data_entrega_inicial) {
			return STATUS_ITEM_ATIVIDADE_PROFESSOR["0"];
		}

		const dataInicial = new Date(itemAtividade.data_entrega_inicial);

		if (dataInicial > now) {
			return STATUS_ITEM_ATIVIDADE_PROFESSOR["1"];
		}

		if (dataInicial <= now && !itemAtividade.entregue) {
			return STATUS_ITEM_ATIVIDADE_PROFESSOR["2"];
		}

		if (itemAtividade.entregue && itemAtividade.nota === undefined) {
			return STATUS_ITEM_ATIVIDADE_PROFESSOR["3"];
		}

		if (itemAtividade.entregue && itemAtividade.nota !== undefined) {
			return STATUS_ITEM_ATIVIDADE_PROFESSOR["4"];
		}
	}

	async listaCriteriosPorIdItemAtividade(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (listaCriteriosPorIdItemAtividade)";
		}

		const res = await listaCriteriosPorIdItemAtividadeBD(idItemAtividade);
		return res.map((c) => new Criterio(c).toObject())
	}

	async listaNotasDeCriteriosPorIdItemAtividade(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (listaNotasDeCriteriosPorIdItemAtividade)";
		}

		return await listaNotasDeCriteriosPorIdItemAtividadeBD(idItemAtividade);
	}

}
