
export default class Anexo {
	constructor({
		id,
		titulo,
		conteudo_texto,
		conteudo_binario,
		data_upload,
		id_entrega,
		id_publicacao_mural,
	}) {
		this.id = id;
		this.titulo = titulo;
		this.conteudo_texto = conteudo_texto;
		this.conteudo_binario = conteudo_binario;
		this.id_entrega = id_entrega;
		this.id_publicacao_mural = id_publicacao_mural;
		this.data_upload = data_upload ? new Date(data_upload) : new Date();
	}

	validar() {
		const camposFaltando = [];

		if (!this.titulo) camposFaltando.push('codigo');
		if (!this.conteudo_texto || !this.conteudo_binario) camposFaltando.push('conteudo_(texto/binario)');
		if (!this.data_upload) camposFaltando.push('data_upload');
		if (!this.id_entrega || !this.id_publicacao_mural) camposFaltando.push('id_(entrega/publicacao_mural)');

		if (camposFaltando.length > 0) {
			throw new Error(`Campos obrigatórios ausentes: ${camposFaltando.join(', ')} (Anexo)`);
		}
	}

	toObject() {
		return {
			id: this.id,
			titulo: this.titulo,
			conteudo_texto: this.conteudo_texto,
			conteudo_binario: this.conteudo_binario,
			data_upload: this.data_upload,
			id_entrega: this.id_entrega,
			id_publicacao_mural: this.id_publicacao_mural,
			data_upload: this.data_upload.toISOString(),
		};
	}
}
