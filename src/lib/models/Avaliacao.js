import AvaliacaoCriterio from "./AvaliacaoCriterio";

export default class Avaliacao {
	constructor({
		id = null,
		id_entrega,
		criterios_avaliados = [],
		data_avaliacao = null
	}) {
		this.id = id;
		this.data_avaliacao = data_avaliacao ? new Date(data_avaliacao) : null;
		this.id_entrega = id_entrega;
		if (
			criterios_avaliados != null &&
			Array.isArray(criterios_avaliados)
		) {
			this.criterios_avaliados = criterios_avaliados ? criterios_avaliados.map((ca) => new AvaliacaoCriterio(ca).toObject()) : [];
		}

		this.media = criterios_avaliados ? (
			this.criterios_avaliados.reduce(
				(acc, c) => acc + c.nota_atribuida
				, 0.0) / this.criterios_avaliados.length
		).toFixed(1) : 0.0;
		console.debug("media =>", this.media)
	}

	toObject() {
		return {
			id: this.id,
			data_avaliacao: this.data_avaliacao ? this.data_avaliacao.toISOString() : null,
			id_entrega: this.id_entrega,
			criterios_avaliados: this.criterios_avaliados,
			media: this.media
		};
	}
}
