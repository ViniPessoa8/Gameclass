import { DB_INFO } from "../../constants";
import { dbConn } from "$config/database.js"

export async function listaComentariosPorIdEntregaBD(idEntrega) {
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

export async function comentarBD(idUsuario, idEntrega, texto, data, tipo) {
	const query = {
		text: `	INSERT INTO  
					${DB_INFO.tables.comentario}("id_usuario", "id_entrega", "texto", "data_criacao", "tipo")
				VALUES
					($1, $2, $3, $4, $5); `,
		values: [parseInt(idUsuario), parseInt(idEntrega), texto, data, parseInt(tipo)]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao criar comentario no banco de dados: ${e}`)
	}
}
