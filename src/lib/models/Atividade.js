import ItemAtividade from "./ItemAtividade.js"

export default class Atividade {
	constructor({ id, titulo, descricao, prazo, id_turma, itens_atividade }) {
		this.id = id
		this.titulo = titulo
		this.descricao = descricao
		this.prazo = new Date(prazo);
		this.id_turma = id_turma
		this.itens_atividade = (itens_atividade || []).map(
			(item) => new ItemAtividade(item)
		);

		this.valida()
	}

	formataPrazo() {
		const dateOptions = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timezone: 'America/Manaus'
		};

		const prazoEtapa = new Date(this.prazo.toISOString());
		const prazoFinalStr = prazoEtapa.toLocaleString('pt-BR', dateOptions);

		return prazoFinalStr

	}

	estaAtrasada() {
		return new Date() > this.prazo;
	}

	valida() {
		const camposFaltando = [];

		if (!this.titulo) camposFaltando.push('titulo');
		if (!this.prazo) camposFaltando.push('prazo');
		if (!this.id_turma) camposFaltando.push('id_turma');

		if (camposFaltando.length > 0) {
			throw new Error(`Dados obrigatórios não preenchidos: ${camposFaltando.join(', ')} (Atividade)`);
		}
	}

	toObject() {

		return {
			id: this.id,
			titulo: this.titulo,
			descricao: this.descricao,
			prazo: this.prazo,
			id_turma: this.id_turma,
			itens_atividade: this.itens_atividade.map((i) => i.toObject()),
		}
	}


}
