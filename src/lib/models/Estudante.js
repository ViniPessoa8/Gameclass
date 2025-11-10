import { Usuario } from './Usuario.js';

export class Estudante extends Usuario {
	constructor({
		id_estudante,
		matricula,
		data_criacao_estudante,
		acumulo_pontos_estudante,
		nivel_estudante,
		id_usuario,
		...usuarioData
	}) {
		super(usuarioData);

		this.id_estudante = id_estudante;
		this.matricula = matricula;
		this.data_criacao_estudante = data_criacao_estudante;
		this.acumulo_pontos_estudante = acumulo_pontos_estudante;
		this.nivel_estudante = nivel_estudante;
		this.id_usuario = id_usuario;

		// opcional: mesclar XP e nível com o do usuário
		this.total_pontos = this.acumulo_pontos + this.acumulo_pontos_estudante;
	}

	getResumoEstudante() {
		return `${this.nome} (Estudante) - Matrícula: ${this.matricula}, Total de Pontos: ${this.total_pontos}`;
	}
}
