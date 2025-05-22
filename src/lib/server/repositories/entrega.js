
import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function listaEntregasPorItemAtividadeIdBD(idItemAtividade) {
	const db = getPool()
	try {
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

		const res = await db.query(query)
		const rowsComAvaliacao = await Promise.all(
			res.rows.map(async (entrega) => {
				const query_avaliacao = {
					text: `SELECT 
								ra.*
							FROM 
								${DB_INFO.tables.realizar_avaliacao} ra
							WHERE 
								ra.id_entrega = $1;`,
					values: [entrega.id]
				};

				const avaliacao = await db.query(query_avaliacao);
				return {
					...entrega,
					avaliada: avaliacao.rows.length > 0
				};
			})
		);

		return { rows: rowsComAvaliacao };
	} catch (e) {
		throw (`Erro ao listar entregas por por id do item atividade (${idItemAtividade}): ${e}`)
	}
}

export async function buscaEntregaPorIdBD(idEntrega) {
	const db = getPool()
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
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar entrega por id (${idEntrega}): ${e}`)
	}
}


export async function listaNotasObtidasDeCriteriosPorIdEntregaBD(idEntrega) {
	const db = getPool()
	try {
		let query = {
			text: `	SELECT ac.*, ra.*, c.titulo, c.pontuacao_max, c.peso
					FROM 
						${DB_INFO.tables.realizar_avaliacao} ra,
						${DB_INFO.tables.avaliacao_criterio} ac,
						${DB_INFO.tables.criterio} c
					WHERE 
						ra.id_entrega = $1
						AND ac.id_realizar_avaliacao = ra.id
						AND ac.id_criterio = c.id
					;`,
			values: [idEntrega]
		}

		let res = await db.query(query)
		return res.rows

	} catch (e) {
		throw (`Erro ao avaliar entrega (${idEntrega}): ${e}`)
	}
}


