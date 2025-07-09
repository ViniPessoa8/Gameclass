export default class AvaliacaoIntegranteCriterio {
	constructor(data) {
		this.id = data.id || null;
		this.nota_atribuida = data.nota_atribuida;
		this.id_realizar_avaliacao = data.id_realizar_avaliacao;
		this.id_estudante = data.id_estudante;
		this.id_criterio = data.id_criterio;
	}
}
