import {
	cadastraAtividadeBD,
	buscaPorIdBD,
	listaPorIdTurmaBD,
	buscaPorTituloBD,
	removeAtividadeBD,
	atualizaAtividadeBD,
	arquivarAtividadeBD
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

	async atualiza(atividade) {

		const existente = await this.buscaPorId(atividade.id);
		if (!existente) {
			throw new Error("Atividade não encontrada");
		}

		const res = await atualizaAtividadeBD(
			atividade.id,
			atividade.titulo,
			atividade.descricao,
			atividade.prazo
		);

		return res.rows[0]; // retorna o ID
	}

	async remove(titulo, id_turma) {
		const res = await buscaPorTituloBD(titulo, id_turma);
		const atividade = res.rows[0];
		if (!atividade) throw new Error("Atividade não encontrada");

		// Remove itens da atividade antes de remover a atividade em si
		const itens = await itemAtividadeController.listaPorIdAtividade(atividade.id);
		for (const item of itens) {
			await itemAtividadeController.removePorId(item.id);
		}

		await removeAtividadeBD(titulo, id_turma); // Remove a atividade
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

	async arquivar(idAtividade) {
		return await arquivarAtividadeBD(idAtividade);
	}
}
