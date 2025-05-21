// src/lib/controllers/AtividadeController.js
import {
	cadastraAtividadeBD,
	getAtividadeByIdBD,
	getAtividadesByIdTurmaBD,
	getAtividadeByTituloBD,
	removeAtividadeBD
} from "../repositories/atividade.js";

import {
	listaItensDaAtividadePorId,
	removeItemAtividadePorId
} from "./itemAtividade.js";

import Atividade from "$lib/models/Atividade.js";

export default class AtividadeController {
	async cadastrar(dados) {
		const atividade = new Atividade(dados);

		const existente = await (atividade.titulo, atividade.id_turma);
		if (existente.rowCount > 0) {
			throw new Error("Uma atividade com o mesmo nome já existe nessa turma");
		}

		const res = await cadastraAtividadeBD(
			atividade.titulo,
			atividade.descricao,
			atividade.prazo,
			atividade.id_turma
		);

		return res.rows[0]; // retorna o ID
	}

	async remover(titulo, id_turma) {
		const res = await getAtividadeByTituloBD(titulo, id_turma);
		const atividade = res.rows[0];
		if (!atividade) return;

		const itens = await listaItensDaAtividadePorId(atividade.id);
		for (const item of itens) {
			await removeItemAtividadePorId(item.id);
		}

		await removeAtividadeBD(titulo, id_turma);
	}

	async buscarPorId(id) {
		const res = await getAtividadeByIdBD(id);
		if (res.rowCount === 0) {
			throw new Error("Não foi encontrada atividade com esse id.");
		}
		return new Atividade(res.rows[0]);
	}

	async buscarPorTitulo(titulo, id_turma) {
		const res = await getAtividadeByTituloBD(titulo, id_turma);
		if (res.rowCount === 0) return null;
		return new Atividade(res.rows[0]);
	}

	async listarPorIdTurma(id_turma) {
		const res = await getAtividadesByIdTurmaBD(id_turma);
		console.debug("res:", res.rows)
		return res.rows.map((row) => new Atividade(row));
	}
}
