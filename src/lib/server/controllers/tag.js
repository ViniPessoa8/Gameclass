import { cadastraTagBD, deletaTagBD, listaTagsProfessorBD } from "../repositories/tag"

export default class TagController {
	async cadastraTag(titulo, cor, idProfessor) {
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

	async listaTagsProfessor(idProfessor) {
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

	async deletaTag(titulo, idProfessor) {
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

}
