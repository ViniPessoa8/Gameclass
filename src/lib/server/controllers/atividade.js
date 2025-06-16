import {
	cadastraAtividadeBD,
	buscaPorIdBD,
	listaPorIdTurmaBD,
	buscaPorTituloBD,
	removeAtividadeBD
} from "../repositories/atividade.js";

import ItemAtividadeController from "./itemAtividade.js";
import Atividade from "$lib/models/Atividade.js";

const itemAtividadeController = new ItemAtividadeController()

export default class AtividadeController {
	async cadastra(atividade) {

		const existente = await this.buscaPorTitulo(atividade.titulo, atividade.id_turma);
		if (existente) {
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

	async remove(titulo, id_turma) {
		const res = await buscaPorTituloBD(titulo, id_turma);
		const atividade = res.rows[0];
		if (!atividade) return;

		const itens = await itemAtividadeController.listaPorIdAtividade(atividade.id);
		for (const item of itens) {
			await itemAtividadeController.removePorId(item.id);
		}

		await removeAtividadeBD(titulo, id_turma);
	}

	async buscaPorId(id) {
		const res = await buscaPorIdBD(id);
		if (res.rowCount === 0) {
			throw new Error("Não foi encontrada atividade com esse id.");
		}
		return new Atividade(res.rows[0]);
	}

	async buscaPorTitulo(titulo, id_turma) {
		const res = await buscaPorTituloBD(titulo, id_turma);
		if (res.rowCount === 0) return null;
		return new Atividade(res.rows[0]);
	}

	async listaPorIdTurma(id_turma) {
		const res = await listaPorIdTurmaBD(id_turma);
		return res.rows.map((row) => new Atividade(row));
	}
}
