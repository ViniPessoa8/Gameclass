import { registerTurmaBD } from "../repositories/turma";
import { getInstituicaoByNome } from "./instituicao";

export async function registraTurma(codigo, disciplina, nome, ano, periodo, local, instituicao) {
	const instituicaoJson = await getInstituicaoByNome(instituicao)
	await registerTurmaBD(codigo, disciplina, nome, ano, periodo, local, instituicaoJson.id)
}
