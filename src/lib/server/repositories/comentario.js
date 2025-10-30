import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function listaComentariosPorIdEntregaBD(idEntrega) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					c.id, c.texto, c.data_criacao AT TIME ZONE 'America/Manaus' data_criacao, c.id_realizar_avaliacao, c.id_item_atividade, c.id_entrega, c.id_publicacao_mural, c.id_usuario, u.nome, u.cor
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
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar comentarios por id da entrega (${idEntrega}): ${e}`)
	}
}

export async function listaComentariosPorIdPublicacaoMuralBD(idPublicacao) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					c.id, c.texto, c.data_criacao AT TIME ZONE 'America/Manaus' data_criacao, c.id_realizar_avaliacao, c.id_item_atividade, c.id_entrega, c.id_publicacao_mural, c.id_usuario, u.nome, u.cor
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
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar comentarios por id da publicação no mural (${idPublicacao}): ${e}`)
	}
}

export async function comentaBD(idUsuario, idEntrega, idPublicacao, idItemAvaliacao, idAvaliacao, texto) {
	const db = getPool()
	if (idEntrega == null && idPublicacao == null && idItemAvaliacao == null && idAvaliacao == null) {
		throw (`Comentário sem referência`)
	}

	const query = {
		text: `	INSERT INTO  
					${DB_INFO.tables.comentario}("id_usuario", "id_entrega", "id_publicacao_mural", "id_item_atividade", "id_realizar_avaliacao", "texto")
				VALUES
					($1, $2, $3, $4, $5, $6); `,
		values: [
			parseInt(idUsuario),
			idEntrega ? parseInt(idEntrega) : null,
			idPublicacao ? parseInt(idPublicacao) : null,
			idItemAvaliacao ? parseInt(idItemAvaliacao) : null,
			idAvaliacao ? parseInt(idAvaliacao) : null,
			texto]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao criar comentario no banco de dados: ${e}`)
	}

}
