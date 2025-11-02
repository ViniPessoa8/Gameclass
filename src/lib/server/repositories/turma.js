import { DB_INFO } from "../../constants";
import { getPool } from "$config/database.js"

export async function registraTurmaBD(disciplina, nome, descricao, ano, periodo, local, instituicaoId, professorId, numero_alunos, cor) {
	const db = getPool()
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.turma}(disciplina, nome, descricao, ano, periodo, local, id_instituicao, id_professor, numero_alunos, cor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`,
		values: [disciplina, nome, descricao, ano, periodo, local, instituicaoId, professorId, numero_alunos, cor]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao registrar nova turma: ${e}`)
	}
}

export async function isTurmaRegisteredDB(nome, instituicaoId) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.turma} WHERE nome = $1 AND id_instituicao = $2;`,
		values: [nome, instituicaoId]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por nome (${nome}) e instituicao (${instituicaoId})): ${e}`)
	}
}

export async function listaTurmaPorNomeBD(nome) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.turma} WHERE nome = $1;`,
		values: [nome]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por nome (${nome}): ${e}`)
	}
}

export async function buscaTurmasPorIdProfessorBD(idProfessor) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.turma} WHERE id_professor = $1;`,
		values: [idProfessor]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por id do professor (${idProfessor}): ${e}`)
	}
}

export async function buscaTurmasPorIdEstudanteProfessorBD(idEstudante, idProfessor) {
	const db = getPool()
	const query = {
		text: `select 
						t.*
					from
						${DB_INFO.tables.turma} t,
						${DB_INFO.tables.estudante_turma} e
					where
						e.id_estudante = $1
						and t.id_professor = $2
						and e.id_turma = t.id`,
		values: [idEstudante, idProfessor]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por id do professor (${idEstudante}): ${e}`)
	}
}

export async function listaTurmaPorIdBD(id) {
	const db = getPool()
	const query = {
		text: `SELECT * FROM ${DB_INFO.tables.turma} WHERE id = $1;`,
		values: [id]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por id (${id}): ${e}`)
	}
}

export async function listaAlunosPorTurmaIdBD(idTurma) {
	const db = getPool()
	const query = {
		text: `	SELECT 
					e.id id_estudante,  u.*, et.pontos
 				FROM 
					${DB_INFO.tables.turma} t,
					${DB_INFO.tables.estudante_turma} et,
					${DB_INFO.tables.estudante} e,
					${DB_INFO.tables.usuario} u
				WHERE 
					t.id = $1
					AND et.id_turma = t.id
					AND e.id_usuario = u.id
					AND et.id_estudante = e.id
				ORDER BY 
					u.nome ASC
;`,

		values: [idTurma]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao buscar turma por id (${idTurma}): ${e}`)
	}
}

export async function removeTurmaPorNomeBD(nome, idInstiuicao) {
	const db = getPool()
	const query = {
		text: `DELETE FROM ${DB_INFO.tables.turma} WHERE nome = $1 AND id_instituicao = $2 RETURNING id;`,
		values: [nome, idInstiuicao]
	}

	try {
		const res = await db.query(query)
		return res
	} catch (e) {
		throw (`Erro ao deletar turma por nome (${nome}) e instituicao (${idInstiuicao}): ${e}`)
	}
}
