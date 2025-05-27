export default class Instituicao {
	constructor({ id, nome, endereco, email }) {
		this.id = id
		this.nome = nome
		this.endereco = endereco
		this.email = email

		this.validar()
	}

	validar() {
		const camposFaltando = [];

		if (!this.nome) camposFaltando.push('nome');
		if (!this.endereco) camposFaltando.push('endereco');
		if (!this.email) camposFaltando.push('email');

		if (camposFaltando.length > 0) {
			throw new Error(`Dados obrigatórios não preenchidos: ${camposFaltando.join(', ')} (Atividade)`);
		}
	}

	toObject() {

		return {
			id: this.id,
			nome: this.nome,
			endereco: this.endereco,
			email: this.email,
		}
	}


}
