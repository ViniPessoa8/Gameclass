import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function cadastraFormacaoBD(id_item_atividade, numero_grupos, numero_alunos) {
	const db = getPool()
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.formacaoGrupo}(id_item_atividade, numero_grupos, numero_alunos) VALUES ($1, $2, $3) RETURNING id`,
		values: [id_item_atividade, numero_grupos, numero_alunos]
	}

	const res = await db.query(query)
	return res
}

export async function listaFormacoesPorIdItemAtividadeBD(id_item_atividade) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.formacaoGrupo} WHERE id_item_atividade = $1`,
		values: [id_item_atividade]
	}

	const res = await db.query(query)
	return res
}

