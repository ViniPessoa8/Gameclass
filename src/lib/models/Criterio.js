export default class Criterio {
	constructor({
		id,
		titulo,
		descricao,
		pontuacao_max,
		peso,
		id_item_atividade
	}) {
		this.id = id;
		this.titulo = titulo;
		this.descricao = descricao;
		this.pontuacao_max = pontuacao_max;
		this.peso = peso;
		this.id_item_atividade = id_item_atividade;
	}

	validar() {
		const camposFaltando = [];

		if (!this.titulo) camposFaltando.push("titulo");
		if (!this.descricao) camposFaltando.push("descricao");
		if (this.pontuacao_max == null) camposFaltando.push("pontuacao_max");
		if (this.peso == null) camposFaltando.push("peso");
		if (!this.id_item_atividade) camposFaltando.push("id_item_atividade");

		if (camposFaltando.length > 0) {
			throw new Error(`Dados obrigatórios não preenchidos: ${camposFaltando.join(", ")} (Critério)`);
		}
	}

	toObject() {
		return {
			id: this.id,
			titulo: this.titulo,
			descricao: this.descricao,
			pontuacao_max: this.pontuacao_max,
			peso: this.peso,
			id_item_atividade: this.id_item_atividade
		};
	}
}
