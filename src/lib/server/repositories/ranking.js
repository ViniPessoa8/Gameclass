import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function listaRankingPorIdTurmaBD(idTurma) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					u.*, e.*, et.pontos
 				FROM 
					${DB_INFO.tables.usuario} u,
					${DB_INFO.tables.estudante} e,
					${DB_INFO.tables.estudante_turma} et,
					${DB_INFO.tables.turma} t
				WHERE 
					u.id = e.id_usuario
					AND e.id = et.id_estudante
					AND t.id = et.id_turma
					AND t.id = $1 
				ORDER BY
					et.pontos DESC;`,
		values: [parseInt(idTurma)]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar ranking por ID da turma (${idTurma}): ${e}`)
	}
}
