import { cadastraAtividadeBD } from "../repositories/atividade"

export async function cadastraAtividade(titulo, descricao, prazo, id_turma) {
	if (!titulo || !prazo || !id_turma) {
		throw ("Dados obrigatórios não foram preenchidos.")
	}

	try {
		let res = await cadastraAtividadeBD(titulo, descricao, prazo, id_turma);

		if (res.rowCount > 0) {
			return res.rows
		}
	} catch (e) {
		throw e;
	}
}
