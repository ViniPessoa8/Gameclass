import {
	removeTurmaPorCodigoBD,
	buscaTurmasPorIdProfessorBD,
	listaTurmaPorIdBD,
	isTurmaRegisteredDB,
	registraTurmaBD,
	listaAlunosPorTurmaIdBD
} from "../repositories/turma.js";

import Turma from "$lib/models/Turma.js";
import InstituicaoController from "./instituicao.js";

const instituicaoController = new InstituicaoController()

const CORES = [
	"4682B4", "6B8E23", "CD5C5C", "9370DB", "778899",
	"D2691E", "DA70D6", "6495ED", "4169E1", "A0522D"
];

function getRandomCor() {
	return CORES[Math.floor(Math.random() * CORES.length)];
}

export default class TurmaController {
	async registra(dadosTurma) {
		// Adiciona cor aleatória se não for informada
		if (!dadosTurma.cor) {
			dadosTurma.cor = getRandomCor();
		}

		// Busca ID da instituição
		const instituicao = await instituicaoController.buscaPorNome(dadosTurma.instituicao);
		dadosTurma.id_instituicao = instituicao.id;

		// Verifica duplicidade
		const existente = await this.estaRegistrada(dadosTurma.codigo, dadosTurma.instituicao);
		if (existente) {
			throw new Error("Turma já registrada.");
		}

		const turma = new Turma({
			...dadosTurma,
			id_professor: dadosTurma.professorId
		});
		turma.validar();

		const res = await registraTurmaBD(
			turma.codigo,
			turma.disciplina,
			turma.nome,
			turma.descricao,
			turma.ano,
			turma.periodo,
			turma.local,
			turma.id_instituicao,
			turma.id_professor,
			turma.numero_alunos,
			turma.cor
		);

		if (res.rows.length > 0) {
			return new Turma(res.rows[0]).toObject();
		}

		throw new Error("Erro na criação da turma.");
	}

	async estaRegistrada(codigo, nomeInstituicao) {
		const instituicao = await instituicaoController.buscaPorNome(nomeInstituicao);
		const res = await isTurmaRegisteredDB(codigo, instituicao.id);
		return res.rows.length > 0;
	}

	async buscaPorCodigo(codigo) {
		const res = await listaTurmaPorIdBD(codigo);
		if (res.rows.length > 0) {
			return new Turma(res.rows[0]).toObject();
		}
		return null;
	}

	async buscaPorId(id) {
		const res = await listaTurmaPorIdBD(id);
		if (res.rows.length > 0) {
			return new Turma(res.rows[0]).toObject();
		}
		return null;
	}

	async listaPorProfessor(idProfessor) {
		const res = await buscaTurmasPorIdProfessorBD(idProfessor);
		return res.rows.map(row => new Turma(row).toObject());
	}

	async listaAlunos(idTurma) {
		const res = await listaAlunosPorTurmaIdBD(idTurma);
		return res.rows;
	}

	async removePorCodigo(codigo) {
		const res = await removeTurmaPorCodigoBD(codigo);
		if (res.rows.length > 0) {
			return new Turma(res.rows[0]).toObject();
		}
		return null;
	}
}
