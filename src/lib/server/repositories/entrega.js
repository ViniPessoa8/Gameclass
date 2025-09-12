import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function listaEntregasPorItemAtividadeIdBD(idItemAtividade) {
	const db = getPool()
	try {
		const query = {
			text: `	
				SELECT 
					ent.*, 
					est.id AS estudante_id,
					est.matricula,
					gp.id AS grupo_id,
					gp.nome AS grupo_nome
				FROM 
					${DB_INFO.tables.entrega} ent
				LEFT JOIN ${DB_INFO.tables.estudante} est ON est.id = ent.id_estudante
				LEFT JOIN ${DB_INFO.tables.grupo} gp ON gp.id = ent.id_grupo_de_alunos
				WHERE 
					ent.id_item_atividade = $1;
			`,
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

export async function listaNotasObtidasDeCriteriosIntegrantePorIdEntregaBD(idEntrega, idIntegrante) {
	const db = getPool()
	try {
		let query = {
			text: `	SELECT aic.*, ra.*, c.titulo, c.pontuacao_max, c.peso
					FROM 
						${DB_INFO.tables.realizar_avaliacao} ra,
						${DB_INFO.tables.avaliacao_integrante_criterio} aic,
						${DB_INFO.tables.criterio} c
					WHERE 
						ra.id_entrega = $1
						AND aic.id_realizar_avaliacao = ra.id
						AND aic.id_criterio = c.id
						AND aic.id_estudante = $2
					;`,
			values: [idEntrega, idIntegrante]
		}

		let res = await db.query(query)
		return res.rows

	} catch (e) {
		throw (`Erro ao avaliar entrega (${idEntrega}): ${e}`)
	}
}
