import {
	buscaItemAtividadePorIdBD,
	buscaItemAtividadePorTituloBD,
	cadastraItemAtividadeBD,
	listaItensDaAtividadePorIdBD,
	removeItemAtividadePorIdBD,
	listaCriteriosPorIdItemAtividadeBD,
	listaNotasDeCriteriosPorIdItemAtividadeBD,
	possuiAvaliacoesPendentesBD,
	alteraItemAtividadeBD,
	arquivaItemAtividadePorIdBD
} from "../repositories/itemAtividade";

import ItemAtividade from "$lib/models/ItemAtividade.js";
import Criterio from "$lib/models/Criterio.js";
import CriterioController from "./criterio";

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
		const criterioController = new CriterioController();
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
				await criterioController.cadastra(c.titulo, c.descricao, c.pontuacao_max, c.peso, idItemAtividade);
			} catch (e) {
				throw `Erro ao cadastrar critério: ${e}`;
			}
		}

		if (res.rowCount > 0) {
			return res.rows[0].id
		}
	}

	async altera(
		{ id,
			titulo,
			descricao,
			data_entrega_inicial,
			data_entrega_final }
	) {
		const camposFaltando = [];

		if (!id) {
			camposFaltando.push('idItemAtividade');
		}
		if (!titulo) {
			camposFaltando.push('titulo');
		}
		if (!data_entrega_inicial) {
			camposFaltando.push('dataEntregaInicial');
		}
		if (!data_entrega_final) {
			camposFaltando.push('dataEntregaFinal');
		}

		if (camposFaltando.length > 0) {
			throw `Os seguintes campos obrigatórios não foram preenchidos ou são inválidos: ${camposFaltando.join(', ')}. (Item Atividade)`;
		}

		let res;
		res = await alteraItemAtividadeBD(
			id,
			titulo,
			descricao,
			data_entrega_inicial,
			data_entrega_final,
		);

		if (res.rowCount > 0) {
			return true
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

		res.status = await this.calculaStatus(res);

		return new ItemAtividade(res);
	}

	async buscaPorTitulo(titulo, idAtividadePai) {
		if (!titulo || !idAtividadePai) {
			throw "Dados obrigatórios não foram preenchidos. (buscarItemAtividadePorTitulo)";
		}

		const res = await buscaItemAtividadePorTituloBD(titulo, idAtividadePai);
		console.debug("res => ", res)
		if (res) {
			return res.map((item) => new ItemAtividade(item));
		}

		return [];
	}

	async listaPorIdAtividade(idAtividadePai) {
		if (!idAtividadePai) {
			throw "Dados obrigatórios não foram preenchidos. (listaItensDaAtividadePorId)";
		}

		const res = await listaItensDaAtividadePorIdBD(idAtividadePai);
		let lista = []
		for (let i = 0; i < res.length; i++) {
			const itemAtividade = new ItemAtividade(res[i])
			itemAtividade.status = await this.calculaStatus(itemAtividade);
			lista.push(itemAtividade)
		}

		return lista
	}

	async removePorId(idItemAtividade) {
		const criterioController = new CriterioController();

		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (RemoveItemAtividadePorId)";
		}

		await criterioController.removePorIdItemAtividade(idItemAtividade);

		const res = await removeItemAtividadePorIdBD(idItemAtividade);
		if (res.rowCount > 0) {
			return res.rows.map((item) => new ItemAtividade(item));
		}
	}

	async calculaStatus(itemAtividade) {
		const now = new Date();
		let status;
		let possuiAvaliacoesPendentes = await this.possuiAvaliacoesPendentes(itemAtividade.id)

		if (!itemAtividade.data_entrega_inicial) {
			status = 0

		} else if (now < itemAtividade.data_entrega_inicial) {
			status = 1

		} else if (possuiAvaliacoesPendentes != 0) {
			status = 3

		} else if (now <= itemAtividade.data_entrega_final) {
			status = 2

		} else {
			status = 4
		}

		return status
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

	async possuiAvaliacoesPendentes(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (possuiAvaliacoesPendentes)";
		}

		const res = await possuiAvaliacoesPendentesBD(idItemAtividade);
		return res.pendencias
	}

	async arquivar(idItemAtividade) {
		if (!idItemAtividade) {
			throw "Dados obrigatórios não foram preenchidos. (possuiAvaliacoesPendentes)";
		}

		return await arquivaItemAtividadePorIdBD(idItemAtividade);
	}
}
