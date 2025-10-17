import { buscaProfessorPorIdBD } from "../repositories/professor"
import { log } from "$lib/utils/logger"

export default class ProfessorController {
	async buscaPorId(idProfessor) {
		log(`ProfessorController -> buscaPorId(${idProfessor})`)
		let res = await buscaProfessorPorIdBD(idProfessor)

		return res.rows[0]
	}
}

