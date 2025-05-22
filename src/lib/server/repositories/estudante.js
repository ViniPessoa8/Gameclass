
import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function buscaEstudantePorIdBD(idEstudante) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					e.*, u.*
 				FROM 
					${DB_INFO.tables.estudante} e,
					${DB_INFO.tables.usuario} u
				WHERE 
					u.id = $1
					AND e.id_usuario = u.id;`,
		values: [parseInt(idEstudante)]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar estudante por id (${idEstudante}): ${e}`)
	}
}
