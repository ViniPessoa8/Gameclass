import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function carregaConfigBD(chave) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					valor
 				FROM 
					${DB_INFO.tables.config}
				WHERE 
					chave = $1;`,
		values: [chave]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar por configuração com chave (${chave}): ${e}`)
	}
}

