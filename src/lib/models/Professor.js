import { Usuario } from './Usuario.js';

export class Professor extends Usuario {
	constructor({
		id_professor,
		siape,
		id_usuario,
		data_criacao_professor,
		...usuarioData
	}) {
		super(usuarioData);

		this.id_professor = id_professor;
		this.siape = siape;
		this.id_usuario = id_usuario;
		this.data_criacao_professor = data_criacao_professor;
	}

	getResumoProfessor() {
		return `${this.nome} (Professor - SIAPE: ${this.siape})`;
	}
}
