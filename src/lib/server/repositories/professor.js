import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function buscaProfessorPorIdBD(idProfessor) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					e.id as id, e.matricula, e.data_criacao, e.acumulo_xp, e.nivel, e.id_usuario, 
u.nome, u.login, u.hash, u.salt, u.bio, u.email, u.acumulo_xp, u.nivel, u.matricula_aluno, u.dt_nasc, u.data_criacao, u.ultimo_acesso, u.cor, u.id_instituicao
 				FROM 
					${DB_INFO.tables.estudante} e,
					${DB_INFO.tables.usuario} u
				WHERE 
					e.id = $1
					AND e.id_usuario = u.id;`,
		values: [parseInt(idProfessor)]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar estudante por id (${idProfessor}): ${e}`)
	}
}
