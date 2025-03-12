
import { DB_INFO } from "../../constants";
import { dbConn } from "$config/database.js"

export async function listaEntregasPorItemAtividadeIdBD(idItemAtividade) {
	const query = {
		text: `	SELECT 
					ent.*
 				FROM 
					${DB_INFO.tables.item_atividade} ia,
					${DB_INFO.tables.entrega} ent,
					${DB_INFO.tables.estudante} est
				WHERE 
					ia.id = ent.id_item_atividade
					AND est.id = ent.id_estudante
					AND ia.id = $1;`,
		values: [idItemAtividade]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por id (${idItemAtividade}): ${e}`)
	}
}

export async function buscaEntregaPorIdBD(idEntrega) {
	const query = {
		text: `	SELECT 
					*
 				FROM 
					${DB_INFO.tables.entrega}
				WHERE 
					id = $1;`,
		values: [idEntrega]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por id (${idEntrega}): ${e}`)
	}
}
