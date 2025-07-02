import {
	buscaItemAtividadePorIdBD,
	buscaItemAtividadePorTituloBD,
	cadastraItemAtividadeBD,
	listaItensDaAtividadePorIdBD,
	removeItemAtividadePorIdBD,
	listaCriteriosPorIdItemAtividadeBD,
	listaNotasDeCriteriosPorIdItemAtividadeBD
} from "../repositories/itemAtividade";

import { STATUS_ITEM_ATIVIDADE_PROFESSOR } from "../../constants";

import ItemAtividade from "$lib/models/ItemAtividade.js";
import Criterio from "$lib/models/Criterio.js";
import CriterioController from "./criterio";

const criterioController = new CriterioController();

export default class ItemAtividadeController {
	async cadastra(
		titulo,
		descricao = '',
		notaMax,
		dataEntregaInicial,
		dataEntregaFinal,
		tipoAtribuicaoNota,
		tipoAvaliacaoNota,
		emGrupos,
		receberAposPrazo,
		idAtividadePai,
		criterios,
		status = 1
	) {
		const camposFaltando = [];

		if (!titulo) {
			camposFaltando.push('titulo');
		}
		if (!notaMax) {
			camposFaltando.push('notaMax');
		}
		if (!dataEntregaInicial) {
			camposFaltando.push('dataEntregaInicial');
		}
		if (!dataEntregaFinal) {
			camposFaltando.push('dataEntregaFinal');
		}
		if (![0, 1].includes(tipoAtribuicaoNota)) {
			camposFaltando.push('tipoAtribuicaoNota (deve ser 0 ou 1)');
		}
		if (idAtividadePai === undefined || idAtividadePai === null || idAtividadePai <= 0) {
			camposFaltando.push('idAtividadePai (deve ser maior que 0)');
		}
		if (!criterios) {
			camposFaltando.push('criterios');
		}
		if (!tipoAvaliacaoNota) {
			camposFaltando.push('tipoAvaliacaoNota');
		}

		if (camposFaltando.length > 0) {
			throw `Os seguintes campos obrigatórios não foram preenchidos ou são inválidos: ${camposFaltando.join(', ')}. (Item Atividade)`;
		}

		// Your existing logic for successful registration would go here
		// For example:
		// console.log("Dados da atividade prontos para cadastro!");
		// return { success: true, message: "Atividade cadastrada com sucesso!" };

		let res;
		try {
			res = await cadastraItemAtividadeBD(
				titulo,
				descricao,
				notaMax,
				dataEntregaInicial,
				dataEntregaFinal,
				tipoAtribuicaoNota,
				tipoAvaliacaoNota,
				emGrupos,
				receberAposPrazo,
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
				await criterioController.cadastra(c.titulo, c.descricao, c.nota_max, c.peso, idItemAtividade);
			} catch (e) {
				throw `Erro ao cadastrar critério: ${e}`;
			}
		}

		if (res.rowCount > 0) {
			return res.rows[0].id
		}
	}

	async buscaPorId(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (buscarItemAtividadePorId)";
		}

		const res = await buscaItemAtividadePorIdBD(idItemAtividade);
		if (!res) {
			return null
		}

		res.status = this.calculaStatus(res);

		return new ItemAtividade(res);
	}

	async buscaPorTitulo(titulo, idAtividadePai) {
		if (!titulo || !idAtividadePai) {
			throw "Dados obrigatórios não foram preenchidos. (buscarItemAtividadePorTitulo)";
		}

		const res = await buscaItemAtividadePorTituloBD(titulo, idAtividadePai);
		return res.map((item) => new ItemAtividade(item));
	}

	async listaPorIdAtividade(idAtividadePai) {
		if (!idAtividadePai) {
			throw "Dados obrigatórios não foram preenchidos. (listaItensDaAtividadePorId)";
		}

		const res = await listaItensDaAtividadePorIdBD(idAtividadePai);

		return res.map((item) => {
			item.status = this.calculaStatus(item);
			return new ItemAtividade(item);
		});
	}

	async removePorId(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (RemoveItemAtividadePorId)";
		}

		await criterioController.removePorIdItemAtividade(idItemAtividade);

		const res = await removeItemAtividadePorIdBD(idItemAtividade);
		if (res.rowCount > 0) {
			return res.rows.map((item) => new ItemAtividade(item));
		}
	}

	calculaStatus(itemAtividade) {
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

	async listaCriteriosPorId(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (listaCriteriosPorIdItemAtividade)";
		}

		const res = await listaCriteriosPorIdItemAtividadeBD(idItemAtividade);
		return res.map((c) => new Criterio(c).toObject())
	}

	async listaNotasDeCriteriosPorId(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (listaNotasDeCriteriosPorIdItemAtividade)";
		}

		return await listaNotasDeCriteriosPorIdItemAtividadeBD(idItemAtividade);
	}

}
