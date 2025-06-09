
export default class FormacaoGrupo {
	constructor({ numero_grupos, numero_alunos, data_definicao = null, id_item_atividade, id = null }) {
		this.id = id
		this.numero_grupos = numero_grupos
		this.numero_alunos = numero_alunos
		this.data_definicao = data_definicao ? new Date(data_definicao) : null;
		this.id_item_atividade = id_item_atividade

		this.validar()
	}

	formataDataDefinicao() {
		if (this.data_definicao == null) return

		const dateOptions = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timezone: 'America/Manaus'
		};

		const dataDefinicao = new Date(this.data_definicao.toISOString());
		const dataDefinicaoStr = dataDefinicao.toLocaleString('pt-BR', dateOptions);

		return dataDefinicaoStr

	}

	validar() {
		const camposFaltando = [];

		if (!this.id_item_atividade) camposFaltando.push('id_item_atividade');
		if (!this.numero_grupos) camposFaltando.push('numero_grupos');
		if (!this.numero_alunos) camposFaltando.push('numero_alunos');

		if (camposFaltando.length > 0) {
			throw new Error(`Dados obrigatórios não preenchidos: ${camposFaltando.join(', ')} (Atividade)`);
		}
	}

	toObject() {

		return {
			id: this.id,
			numero_grupos: this.numero_grupos,
			numero_grupos: this.numero_grupos,
			data_definicao: this.data_definicao,
			id_item_atividade: this.id_item_atividade,
		}
	}

}
