import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function cadastraIntegranteEmGrupoBD(idEstudante, idGrupo) {
	const db = getPool()
	const query = {
		text: `	INSERT INTO ${DB_INFO.tables.integrante_grupo}(id_estudante, id_grupo_de_alunos)
						VALUES($1, $2)`,
		values: [idEstudante, idGrupo]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao cadastrar integrante em grupo: ${e}`)
	}
}

export async function listaPorIdGrupoBD(idGrupo) {
	const db = getPool()
	const query = {
		text: `	SELECT 
							u.*, e.*
						FROM 
							${DB_INFO.tables.integrante_grupo} ig,
							${DB_INFO.tables.estudante} e,
							${DB_INFO.tables.usuario} u,
						WHERE
							ig.id_grupo_de_alunos = $1
							AND e.id = ig.id_estudante
							AND e.id_usuario = u.id `,
		values: [idGrupo]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao listar integrantes do grupo: ${e}`)
	}
}
