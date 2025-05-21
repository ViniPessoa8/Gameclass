// src/lib/server/controllers/CriterioController.js
import { cadastraCriterioBD, removeCriterioPorIdItemAtividadeBD } from "../repositories/criterio.js";

export default class CriterioController {
	async cadastrar(titulo, descricao = '', notaMax, peso, idItemAtividade) {
		if (!titulo || !notaMax || !idItemAtividade) {
			throw new Error("Dados obrigatórios não foram preenchidos. (Critério)");
		}

		if (peso === '') {
			peso = 1;
		}

		try {
			const res = await cadastraCriterioBD(titulo, descricao, notaMax, peso, idItemAtividade);

			if (res.rowCount > 0) {
				return res.rows;
			}
		} catch (e) {
			if (e.message.includes("duplicate key value violates unique constraint")) {
				throw new Error(`Já existe um critério com o mesmo nome nesse item de atividade`);
			}
			throw e;
		}
	}

	async removerPorItemAtividade(idItemAtividade) {
		if (!idItemAtividade) {
			throw new Error("Dados obrigatórios não foram preenchidos. (Critério)");
		}

		const res = await removeCriterioPorIdItemAtividadeBD(idItemAtividade);

		if (res.rowCount > 0) {
			return res.rows;
		}
	}
}
