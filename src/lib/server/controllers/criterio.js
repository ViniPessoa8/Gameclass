// src/lib/server/controllers/CriterioController.js
import { cadastraCriterioBD, listaCriteriosPorIdProfessorBD, removeCriterioPorIdItemAtividadeBD } from "../repositories/criterio.js";

export default class CriterioController {
	async cadastra(titulo, descricao = '', notaMax, peso, idItemAtividade) {
		if (!titulo || !notaMax || !idItemAtividade) {
			throw new Error("Dados obrigatórios não foram preenchidos.");
		}

		if (peso === '') {
			peso = 1;
		}

		const res = await cadastraCriterioBD(titulo, descricao, notaMax, peso, idItemAtividade);

		if (res.rowCount > 0) {
			return res.rows;
		}
	}

	async removePorIdItemAtividade(idItemAtividade) {
		if (!idItemAtividade) {
			throw new Error("Dados obrigatórios não foram preenchidos. (Critério)");
		}

		const res = await removeCriterioPorIdItemAtividadeBD(idItemAtividade);

		if (res.rowCount > 0) {
			return res.rows;
		}
	}

	async listaPorIdProfessor(idProfessor) {
		if (!idProfessor) {
			throw new Error("Informe o id do professor");
		}

		const res = await listaCriteriosPorIdProfessorBD(idProfessor);

		if (res.rowCount > 0) {
			return res.rows;
		}

	}
}
