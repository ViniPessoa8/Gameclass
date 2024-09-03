import { error } from "@sveltejs/kit";
import { deleteTurmaByCodigoBD, getTurmasByIdProfessorBD, getTurmaByCodigoBD, isTurmaRegisteredDB, registraTurmaBD } from "../repositories/turma";
import { getInstituicaoByNome } from "./instituicao";

const CORES = ['FFFF00', 'FF00FF', '00FFFF']

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export async function registraTurma(codigo, disciplina, nome, descricao, ano, periodo, local, instituicao, professorId, numero_alunos = 0, cor = "") {
	// Verifica se turma ja existe
	let isRegistered = await isTurmaRegistered(codigo, instituicao)
	if (isRegistered) {
		error(409, { already_registered: true })
	}

	// Verifica se input está completo
	if (!codigo | !disciplina | !nome | !descricao | !ano | !periodo | !local | !instituicao | !professorId) {
		error(422, { message: "The request has missing data", missing_info: true })
	}

	if (cor === "") {
		cor = CORES[getRandomInt(CORES.length)]
	}

	const instituicaoJson = await getInstituicaoByNome(instituicao)

	let res = await registraTurmaBD(codigo, disciplina, nome, descricao, ano, periodo, local, instituicaoJson.id, professorId, numero_alunos, cor)

	if (res.rows.length > 0) {
		return res.rows[0]
	}

	error(500, "Erro na criação da turma.")
}

export async function isTurmaRegistered(codigo, instituicao) {
	const instituicaoId = (await getInstituicaoByNome(instituicao)).id;
	const res = await isTurmaRegisteredDB(codigo, instituicaoId);

	if (res.rows.length > 0) {
		return res.rows[0]
	}

	return false
}
export async function getTurmaByCodigo(codigo) {
	const turma = await getTurmaByCodigoBD(codigo);

	if (turma.rows.length > 0) {
		return turma.rows[0]
	}

	return false
}

export async function getTurmasByIdProfessor(idProfessor) {
	const turmas = await getTurmasByIdProfessorBD(idProfessor)

	if (turmas.rows.length > 0) {
		return turmas.rows
	}

	return false
}

export async function deleteTurmaByCodigo(codigo) {
	const turma = await deleteTurmaByCodigoBD(codigo);

	if (turma.rows.length > 0) {
		return turma.rows[0]
	}

	return false
}
