export class EstudanteTurma {
	constructor({ id, pontos, id_estudante, id_turma }) {
		this.id = id;
		this.pontos = pontos;
		this.id_estudante = id_estudante;
		this.id_turma = id_turma;
	}

	adicionarPontos(valor) {
		this.pontos += valor;
	}

	getResumo() {
		return `Estudante ID ${this.id_estudante} na Turma ID ${this.id_turma} possui ${this.pontos} pontos`;
	}
}
