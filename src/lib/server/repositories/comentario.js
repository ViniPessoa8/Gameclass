import { DB_INFO } from "../../constants";
import { dbConn } from "$config/database.js"

export async function listaComentariosPorIdEntregaBD(idEntrega) {
	const query = {
		text: `	SELECT 
					c.*, u.nome, u.cor
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

export async function listaComentariosPorIdPublicacaoMuralBD(idPublicacao) {
	const query = {
		text: `	SELECT 
					c.*, u.nome, u.cor
 				FROM 
					${DB_INFO.tables.mural} m,
					${DB_INFO.tables.comentario} c,
					${DB_INFO.tables.usuario} u
				WHERE 
					m.id = $1
					AND c.id_publicacao_mural = m.id
					AND c.id_usuario = u.id;`,
		values: [parseInt(idPublicacao)]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar comentarios por id da publicação no mural (${idPublicacao}): ${e}`)
	}
}

export async function comentarBD(idUsuario, idEntrega, idPublicacao, idItemAvaliacao, idAvaliacao, texto) {
	if (idEntrega == null && idPublicacao == null && idItemAvaliacao == null && idAvaliacao == null) {
		throw (`Comentário sem referência`)
	}

	const query = {
		text: `	INSERT INTO  
					${DB_INFO.tables.comentario}("id_usuario", "id_entrega", "id_publicacao_mural", "id_item_atividade", "id_realizar_avaliacao", "texto", "data_criacao")
				VALUES
					($1, $2, $3, $4, $5, $6, NOW()); `,
		values: [
			parseInt(idUsuario),
			idEntrega ? parseInt(idEntrega) : null,
			idPublicacao ? parseInt(idPublicacao) : null,
			idItemAvaliacao ? parseInt(idItemAvaliacao) : null,
			idAvaliacao ? parseInt(idAvaliacao) : null,
			texto]
	}
	console.debug("QUERY:", query)

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao criar comentario no banco de dados: ${e}`)
	}

}
