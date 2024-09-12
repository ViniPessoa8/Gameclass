import { cadastraAtividadeBD, removeAtividadeBD } from "../repositories/atividade"

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
		if (e.includes("duplicate key value violates unique constraint")) {
			throw ("Uma atividade com o mesmo nome já existe nessa turma.")
		}
		throw e;
	}
}

export async function removeAtividade(titulo, id_turma) {
	await removeAtividadeBD(titulo, id_turma)
}
