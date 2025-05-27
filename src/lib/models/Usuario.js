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
		matricula_aluno,
		dt_nasc,
		data_criacao,
		ultimo_acesso,
		cor,
		id_instituicao
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
		this.matricula_aluno = matricula_aluno;
		this.data_nascimento = dt_nasc;
		this.data_criacao = data_criacao;
		this.ultimo_acesso = ultimo_acesso;
		this.cor = cor;
		this.id_instituicao = id_instituicao;
	}

	getResumo() {
		return `${this.nome} (nível ${this.nivel})`;
	}
}
