export default class AvaliacaoCriterio {
	constructor({ id = null, nota_atribuida, id_realizar_avaliacao = null, id_criterio }) {

		this.id = id;
		this.nota_atribuida = nota_atribuida;
		this.id_realizar_avaliacao = id_realizar_avaliacao;
		this.id_criterio = id_criterio;
	}

	toObject() {
		return {
			id: this.id,
			nota_atribuida: this.nota_atribuida,
			id_realizar_avaliacao: this.id_realizar_avaliacao,
			id_criterio: this.id_criterio
		};
	}
}

