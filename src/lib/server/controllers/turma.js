import { getTurmaByCodigoBD, registraTurmaBD } from "../repositories/turma";
import { getInstituicaoByNome } from "./instituicao";

export async function registraTurma(codigo, disciplina, nome, ano, periodo, local, instituicao) {
	// TODO: Checar se já existe turma cadastrada

	const instituicaoJson = await getInstituicaoByNome(instituicao)
	await registraTurmaBD(codigo, disciplina, nome, ano, periodo, local, instituicaoJson.id)
}

export async function getTurmaByCodigo(codigo) {
	// TODO: Checar se já existe turma cadastrada

	const turma = await getTurmaByCodigoBD(codigo);
	if (turma.rows.length > 1) {
		return turma.rows[0]
	}
	return false
}
