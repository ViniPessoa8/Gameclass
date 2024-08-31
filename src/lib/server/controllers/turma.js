import { deleteTurmaByCodigoBD, getTurmaByCodigoBD, registraTurmaBD } from "../repositories/turma";
import { getInstituicaoByNome } from "./instituicao";

export async function registraTurma(codigo, disciplina, nome, ano, periodo, local, instituicao) {
	// TODO: Checar se já existe turma cadastrada

	const instituicaoJson = await getInstituicaoByNome(instituicao)
	let res = await registraTurmaBD(codigo, disciplina, nome, ano, periodo, local, instituicaoJson.id)
	if (res.rows.length > 0) {
		return res.rows[0]
	}
	throw ("Erro na criação da turma.")
}

export async function getTurmaByCodigo(codigo) {
	// TODO: Checar se já existe turma cadastrada

	const turma = await getTurmaByCodigoBD(codigo);
	if (turma.rows.length > 0) {
		return turma.rows[0]
	}
	return false
}

export async function deleteTurmaByCodigo(codigo) {
	// TODO: Checar se já existe turma cadastrada

	const turma = await deleteTurmaByCodigoBD(codigo);
	if (turma.rows.length > 0) {
		return turma.rows[0]
	}
	return false
}
