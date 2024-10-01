import { cadastraTagBD, deletaTagBD, listaTagsProfessorBD } from "../repositories/tag"

export async function cadastraTag(titulo, cor, idProfessor) {
	if (!titulo || !cor || !idProfessor) {
		throw ("cadastraTag: Dados obrigatórios não foram preenchidos.")
	}

	try {
		let res = await cadastraTagBD(titulo, cor, idProfessor);

		if (res.rowCount > 0) {
			return res.rows
		}
	} catch (e) {
		throw e;
	}
}

export async function listaTagsProfessor(idProfessor) {
	if (!idProfessor) {
		throw ("listaTagsProfessor: Dados obrigatórios não foram preenchidos.")
	}

	try {
		let res = await listaTagsProfessorBD(idProfessor);

		if (res.rowCount > 0) {
			return res.rows
		}
	} catch (e) {
		throw e;
	}
}

export async function deletaTag(titulo, idProfessor) {
	if (!titulo || !idProfessor) {
		throw ("deletaTag: Dados obrigatórios não foram preenchidos.")
	}

	try {
		let res = await deletaTagBD(titulo, idProfessor);

		if (res.rowCount > 0) {
			return res.rows
		}
	} catch (e) {
		throw e;
	}
}
