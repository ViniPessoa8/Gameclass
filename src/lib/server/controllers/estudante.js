import { buscaEstudantePorIdBD } from "../repositories/estudante"

export async function buscaEstudantePorId(idEstudante) {
	let res = await buscaEstudantePorIdBD(idEstudante)

	return res.rows[0]
}
