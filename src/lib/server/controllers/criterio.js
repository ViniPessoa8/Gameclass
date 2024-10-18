import { cadastraCriterioBD, removeCriterioPorIdItemAtividadeBD } from "../repositories/criterio";

async function cadastraCriterio(titulo, notaMax, peso, idItemAtividade) {
	if (!titulo || !notaMax || !peso || !idItemAtividade) {
		throw ("Dados obrigatórios não foram preenchidos. (Criterio)")
	}

	try {
		let res = await cadastraCriterioBD(titulo, notaMax, peso, idItemAtividade);

		if (res.rowCount > 0) {
			return res.rows
		}
	} catch (e) {
		if (e.message.includes("duplicate key value violates unique constraint")) {
			throw new Error(`Uma atividade com o mesmo nome já existe nessa turma`)
		}
		throw e;
	}

}

export async function removeCriterioPorIdItemAtividade(idItemAtividade) {
	if (!idItemAtividade) {
		throw ("Dados obrigatórios não foram preenchidos. (Criterio)")
	}

	let res = await removeCriterioPorIdItemAtividadeBD(idItemAtividade);

	if (res.rowCount > 0) {
		return res.rows
	}

}
