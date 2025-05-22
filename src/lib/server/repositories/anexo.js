import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function listaAnexosPorIdEntregaBD(idEntrega) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					*
 				FROM 
					${DB_INFO.tables.anexo}
				WHERE 
					id_entrega = $1;`,
		values: [parseInt(idEntrega)]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar anexos por ID da entrega (${idEntrega}): ${e}`)
	}
}


export async function listaAnexosPorIdPublicacaoMuralBD(idPublicacaoMural) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					*
 				FROM 
					${DB_INFO.tables.anexo}
				WHERE 
					id_publicacao_mural = $1;`,
		values: [parseInt(idPublicacaoMural)]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar anexos por ID da publicação do mural (${idPublicacaoMural}): ${e}`)
	}
}
