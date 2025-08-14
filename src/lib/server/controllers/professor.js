import { buscaProfessorPorIdBD } from "../repositories/professor"

export default class ProfessorController {
	async buscaPorId(idProfessor) {
		let res = await buscaProfessorPorIdBD(idProfessor)

		return res.rows[0]
	}
}

