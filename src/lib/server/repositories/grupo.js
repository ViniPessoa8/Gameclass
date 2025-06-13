import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function listaGruposPorIdItemAtividadeBD(idItemAtividade) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					*
 				FROM 
					${DB_INFO.tables.grupo}
				WHERE 
					id_item_atividade = $1;`,
		values: [parseInt(idItemAtividade)]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar grupos por ID do Item da atividade (${idItemAtividade}): ${e}`)
	}
}

export async function buscaGrupoPorIdBD(idGrupo) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					*
 				FROM 
					${DB_INFO.tables.grupo}
				WHERE 
					id = $1;`,
		values: [parseInt(idGrupo)]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar grupo por ID (${idGrupo}): ${e}`)
	}
}
