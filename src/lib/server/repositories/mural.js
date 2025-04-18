import { dbConn } from "$config/database.js"
import { DB_INFO } from "../../constants"

export async function getPublicacoesByIdTurmaBD(idTurma) {
	const query = {
		text: `	SELECT 
					m.*, u.nome autor, u.cor cor_autor
 				FROM 
 					${DB_INFO.tables.mural} m,
 					${DB_INFO.tables.usuario} u
				WHERE 
					id_turma = $1
					AND m.id_usuario = u.id
				`,
		values: [idTurma]
	}

	try {
		const res = await dbConn.query(query)
		if (!res) {
			throw (`Não foi encontrada publicação na turma com ID ${idTurma}`)
		}
		return res
	} catch (e) {
		throw (`Erro ao buscar atividade por ID da turma (${idTurma}): ${e}`)
	}
}

