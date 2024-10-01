import { cadastraAtividadeBD, getAtividadeByIdBD, getAtividadeByTituloBD, removeAtividadeBD } from "../repositories/atividade"
import { buscaItemAtividadePorId } from "../repositories/itemAtividade";
import { listaItensDaAtividade, listaItensDaAtividadePorId, removeItemAtividadePorId } from "./itemAtividade";

// TODO: Add missing parameters
export async function cadastraAtividade(titulo, descricao, prazo, id_turma) {
	if (!titulo || !prazo || !id_turma) {
		throw ("Dados obrigatórios não foram preenchidos. (Atividade)")
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
	// Verifica se atividade tem itens para serem excluidos
	let atividade = await getAtividadeByTitulo(titulo, id_turma)
	if (!atividade) return

	let idAtividadePai = atividade.id
	let listaItens = await listaItensDaAtividadePorId(idAtividadePai)
	listaItens.forEach((item) => {
		removeItemAtividadePorId(item.id)
	})

	await removeAtividadeBD(titulo, id_turma)
}

export async function getAtividadeById(id) {
	let res = await getAtividadeByIdBD(id)
	if (res.rowCount === 0) {
		throw ("Não foi encontrada atividade com esse id.")
	}
	return res
}

export async function getAtividadeByTitulo(titulo, id_turma) {
	let res = await getAtividadeByTituloBD(titulo, id_turma)
	return res.rows[0]

}

