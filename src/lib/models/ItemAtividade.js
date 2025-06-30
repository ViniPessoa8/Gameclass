
export default class ItemAtividade {
	constructor({ id, titulo, descricao, data_entrega_inicial, data_entrega_final, tipo_atribuicao_nota, tipo_avaliacao_nota, em_grupos, receber_apos_prazo, status, id_atividade }) {
		this.id = id;
		this.titulo = titulo;
		this.descricao = descricao;
		this.data_entrega_inicial = data_entrega_inicial;
		this.data_entrega_final = data_entrega_final;
		this.tipo_atribuicao_nota = tipo_atribuicao_nota;
		this.tipo_avaliacao_nota = tipo_avaliacao_nota;
		this.em_grupos = em_grupos;
		this.receber_apos_prazo = receber_apos_prazo;
		this.status = status;
		this.id_atividade = id_atividade;

	}

	formataDataFinal() {
		const dateOptions = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timezone: 'America/Manaus'
		};

		const dataFinal = new Date(this.data_entrega_final.toISOString());
		const dataFinalStr = dataFinal.toLocaleString('pt-BR', dateOptions);

		return dataFinalStr

	}

	estaAtrasada() {
		return new Date() > this.data_entrega_final;
	}

	validar() {
		const camposFaltando = [];

		if (!this.titulo) camposFaltando.push('titulo');
		if (!this.data_entrega_inicial) camposFaltando.push('data_entrega_inicial');
		if (!this.data_entrega_final) camposFaltando.push('data_entrega_final');
		if (!this.tipo_atribuicao_nota) camposFaltando.push('tipo_atribuicao_nota');
		if (!this.tipo_avaliacao_nota) camposFaltando.push('tipo_avaliacao_nota');
		if (!this.em_grupos) camposFaltando.push('em_grupos');
		if (!this.receber_apos_prazo) camposFaltando.push('receber_apos_prazo');
		if (!this.status) camposFaltando.push('status');
		if (!this.id_atividade) camposFaltando.push('id_atividade');

		if (camposFaltando.length > 0) {
			throw new Error(`Dados obrigatórios não preenchidos: ${camposFaltando.join(', ')} (ItemAtividade)`);
		}
	}

	toObject() {
		return { ...this }
		// return {
		// 	id: this.id,
		// 	titulo: this.titulo,
		// 	descricao: this.descricao,
		// 	dtEntregaInicial: this.dtEntregaInicial,
		// 	dtEntregaFinal: this.dtEntregaFinal,
		// 	tipoAtribuicaoNota: this.tipoAtribuicaoNota,
		// 	emGrupos: this.emGrupos,
		// 	receberAposPrazo: this.receberAposPrazo,
		// 	nIntegrantes_grupo: this.nIntegrantes_grupo,
		// 	nMaxGrupos: this.nMaxGrupos,
		// 	idAtividade: this.idAtividade
		// };
	}
}
