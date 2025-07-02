import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function buscaEstudantePorIdBD(idEstudante) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					e.*, u.*
 				FROM 
					${DB_INFO.tables.estudante} e,
					${DB_INFO.tables.usuario} u
				WHERE 
					u.id = $1
					AND e.id_usuario = u.id;`,
		values: [parseInt(idEstudante)]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar estudante por id (${idEstudante}): ${e}`)
	}
}

export async function buscaEstudantePorIdGrupoBD(idGrupo) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					e.*, u.*
 				FROM 
					${DB_INFO.tables.estudante} e,
					${DB_INFO.tables.usuario} u,
					${DB_INFO.tables.integrante_grupo} ig
				WHERE 
					ig.id_grupo_de_alunos = $1
					AND ig.id_estudante = e.id
					AND e.id_usuario = u.id;`,
		values: [parseInt(idGrupo)]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar estudante por id do grupo (${idGrupo}): ${e}`)
	}
}
