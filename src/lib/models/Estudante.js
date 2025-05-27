import { Usuario } from './Usuario.js';

export class Estudante extends Usuario {
	constructor({
		id_estudante,
		matricula,
		data_criacao_estudante,
		acumulo_xp_estudante,
		nivel_estudante,
		id_usuario,
		...usuarioData
	}) {
		super(usuarioData);

		this.id_estudante = id_estudante;
		this.matricula = matricula;
		this.data_criacao_estudante = data_criacao_estudante;
		this.acumulo_xp_estudante = acumulo_xp_estudante;
		this.nivel_estudante = nivel_estudante;
		this.id_usuario = id_usuario;

		// opcional: mesclar XP e nível com o do usuário
		this.total_xp = this.acumulo_xp + this.acumulo_xp_estudante;
	}

	getResumoEstudante() {
		return `${this.nome} (Estudante) - Matrícula: ${this.matricula}, XP total: ${this.total_xp}`;
	}
}
