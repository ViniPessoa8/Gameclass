export default class Turma {
	constructor({
		id,
		codigo,
		cor,
		disciplina,
		nome,
		descricao,
		ano,
		periodo,
		local,
		numero_alunos,
		data_criacao,
		id_instituicao,
		id_professor
	}) {
		this.id = id;
		this.codigo = codigo;
		this.cor = cor;
		this.disciplina = disciplina;
		this.nome = nome;
		this.descricao = descricao;
		this.ano = ano;
		this.periodo = periodo;
		this.local = local;
		this.numero_alunos = numero_alunos ?? 0;
		this.data_criacao = data_criacao ? new Date(data_criacao) : new Date();
		this.id_instituicao = id_instituicao;
		this.id_professor = id_professor;
	}

	validar() {
		const camposFaltando = [];

		if (!this.cor) camposFaltando.push('cor');
		if (!this.disciplina) camposFaltando.push('disciplina');
		if (!this.nome) camposFaltando.push('nome');
		if (!this.ano) camposFaltando.push('ano');
		if (!this.periodo) camposFaltando.push('periodo');
		if (!this.local) camposFaltando.push('local');
		if (!this.id_instituicao) camposFaltando.push('id_instituicao');
		if (!this.id_professor) camposFaltando.push('id_professor');

		if (camposFaltando.length > 0) {
			throw new Error(`Campos obrigatórios ausentes: ${camposFaltando.join(', ')} (Turma)`);
		}
	}

	toObject() {
		return {
			id: this.id,
			codigo: this.codigo,
			cor: this.cor,
			disciplina: this.disciplina,
			nome: this.nome,
			descricao: this.descricao,
			ano: this.ano,
			periodo: this.periodo,
			local: this.local,
			numero_alunos: this.numero_alunos,
			data_criacao: this.data_criacao.toISOString(),
			id_instituicao: this.id_instituicao,
			id_professor: this.id_professor
		};
	}
}
