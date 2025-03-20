import { DB_INFO } from "../../constants";
import { dbConn } from "$config/database.js"

export async function listaAnexosPorIdEntregaBD(idEntrega) {
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
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar anexos por ID da entrega (${idEntrega}): ${e}`)
	}
}
