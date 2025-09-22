export class Usuario {
	constructor({
		id,
		nome,
		login,
		hash,
		salt,
		bio,
		email,
		acumulo_xp,
		nivel,
		dt_nasc,
		data_criacao,
		ultimo_acesso,
		cor,
	}) {
		this.id = id;
		this.nome = nome;
		this.login = login;
		this.hash = hash;
		this.salt = salt;
		this.bio = bio;
		this.email = email;
		this.acumulo_xp = acumulo_xp;
		this.nivel = nivel;
		this.data_nascimento = dt_nasc;
		this.data_criacao = data_criacao;
		this.ultimo_acesso = ultimo_acesso;
		this.cor = cor;
	}

	getResumo() {
		return `${this.nome} (nível ${this.nivel})`;
	}

	toObject() {
		return {
			id: this.id,
			nome: this.nome,
			login: this.login,
			hash: this.hash,
			salt: this.salt,
			bio: this.bio,
			email: this.email,
			acumulo_xp: this.acumulo_xp,
			nivel: this.nivel,
			data_nascimento: this.data_nascimento,
			data_criacao: this.data_criacao,
			ultimo_acesso: this.ultimo_acesso,
			cor: this.cor,
		};
	}

}
