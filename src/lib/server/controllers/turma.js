import {
	deleteTurmaByCodigoBD,
	getTurmasByIdProfessorBD,
	getTurmaByCodigoBD,
	getTurmaByIdBD,
	isTurmaRegisteredDB,
	registraTurmaBD,
	listAlunosByTurmaIdBD
} from "../repositories/turma.js";

import { getInstituicaoByNome } from "./instituicao.js";
import Turma from "$lib/models/Turma.js";

const CORES = [
	"4682B4", "6B8E23", "CD5C5C", "9370DB", "778899",
	"D2691E", "DA70D6", "6495ED", "4169E1", "A0522D"
];

function getRandomCor() {
	return CORES[Math.floor(Math.random() * CORES.length)];
}

export default class TurmaController {
	async registrar(dadosTurma) {
		// Adiciona cor aleatória se não for informada
		if (!dadosTurma.cor) {
			dadosTurma.cor = getRandomCor();
		}

		// Busca ID da instituição
		const instituicao = await getInstituicaoByNome(dadosTurma.instituicao);
		dadosTurma.id_instituicao = instituicao.id;

		// Verifica duplicidade
		const existente = await this.isRegistrada(dadosTurma.codigo, dadosTurma.instituicao);
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

	async isRegistrada(codigo, nomeInstituicao) {
		const instituicao = await getInstituicaoByNome(nomeInstituicao);
		const res = await isTurmaRegisteredDB(codigo, instituicao.id);
		return res.rows.length > 0;
	}

	async buscarPorCodigo(codigo) {
		const res = await getTurmaByCodigoBD(codigo);
		if (res.rows.length > 0) {
			return new Turma(res.rows[0]).toObject();
		}
		return null;
	}

	async buscarPorId(id) {
		const res = await getTurmaByIdBD(id);
		if (res.rows.length > 0) {
			return new Turma(res.rows[0]).toObject();
		}
		return null;
	}

	async listarPorProfessor(idProfessor) {
		const res = await getTurmasByIdProfessorBD(idProfessor);
		return res.rows.map(row => new Turma(row).toObject());
	}

	async listarAlunos(idTurma) {
		const res = await listAlunosByTurmaIdBD(idTurma);
		return res.rows;
	}

	async removerPorCodigo(codigo) {
		const res = await deleteTurmaByCodigoBD(codigo);
		if (res.rows.length > 0) {
			return new Turma(res.rows[0]).toObject();
		}
		return null;
	}
}
