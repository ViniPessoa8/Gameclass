import { cadastraCriterioBD, removeCriterioPorIdItemAtividadeBD } from "../repositories/criterio";

export async function cadastraCriterio(titulo, descricao = '', notaMax, peso, idItemAtividade) {
	if (!titulo || !notaMax || !idItemAtividade) {
		throw ("Dados obrigatórios não foram preenchidos. (Criterio)")
	}

	if (peso === '') {
		peso = 1
	}

	try {
		let res = await cadastraCriterioBD(titulo, descricao, notaMax, peso, idItemAtividade);

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
