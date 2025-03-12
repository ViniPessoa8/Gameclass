import { DB_INFO } from "../../constants";
import { dbConn } from "$config/database.js"

export async function listaComentariosPorIdEntregaBD(idEntrega) {
	console.debug("idEntrega: ", idEntrega)
	const query = {
		text: `	SELECT 
					c.*, u.nome
 				FROM 
					${DB_INFO.tables.entrega} e,
					${DB_INFO.tables.comentario} c,
					${DB_INFO.tables.usuario} u
				WHERE 
					e.id = $1
					AND c.id_entrega = e.id
					AND c.id_usuario = u.id;`,
		values: [parseInt(idEntrega)]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar comentarios por id da entrega (${idEntrega}): ${e}`)
	}
}
