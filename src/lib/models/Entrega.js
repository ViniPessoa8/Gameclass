import { STATUS_ENTREGA } from '$lib/constants.js';

export default class Entrega {
	constructor({
		id = null,
		data_entrega = null,
		id_grupo_de_alunos,
		id_item_atividade,
		id_estudante,
	}) {
		this.id = id;
		this.data_entrega = data_entrega ? new Date(data_entrega) : null;
		this.id_grupo_de_alunos = id_grupo_de_alunos;
		this.id_item_atividade = id_item_atividade;
		this.id_estudante = id_estudante;
	}


	formataDataEntrega() {
		const dateOptions = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timezone: 'America/Manaus'
		};

		const prazoEtapa = new Date(this.data_entrega.toISOString());
		const prazoFinalStr = prazoEtapa.toLocaleString('pt-BR', dateOptions);

		return prazoFinalStr

	}

	toObject() {
		return {
			id: this.id,
			data_entrega: this.data_entrega ? this.data_entrega.toISOString() : null,
			id_grupo_de_alunos: this.id_grupo_de_alunos,
			id_item_atividade: this.id_item_atividade,
			id_estudante: this.id_estudante,
		};
	}
}
