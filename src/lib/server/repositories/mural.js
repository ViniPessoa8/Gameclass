import { dbConn } from "$config/database.js"
import { DB_INFO } from "../../constants"

export async function getPublicacoesByIdTurmaBD(idTurma) {
	const query = {
		text: `	SELECT 
					m.*, u.nome autor, u.cor cor_autor
 				FROM 
 					${DB_INFO.tables.mural} m,
 					${DB_INFO.tables.usuario} u
				WHERE 
					id_turma = $1
					AND m.id_usuario = u.id
				ORDER BY
					m.data_publicacao DESC
				`,
		values: [idTurma]
	}

	try {
		const res = await dbConn.query(query)
		if (!res) {
			throw (`Não foi encontrada publicação na turma com ID ${idTurma}`)
		}
		return res
	} catch (e) {
		throw (`Erro ao buscar atividade por ID da turma (${idTurma}): ${e}`)
	}
}

export async function criaPublicacaoBD(idTurma, idUsuario, textoPublicacao, anexosData) {
	try {
		await dbConn.query('BEGIN');
		const query = {
			text: `	INSERT INTO
						${DB_INFO.tables.mural}(id_turma, id_usuario, conteudo, data_publicacao)
					VALUES(
						$1, $2, $3, NOW()
					)
					RETURNING
						id
					`,
			values: [idTurma, idUsuario, textoPublicacao]
		}

		const resPubli = await dbConn.query(query)
		if (!resPubli) {
			throw (`Não foi possível criar publicação na turma`)
		}

		if (anexosData) {
		for (const anexo of anexosData) {
			const idPublicacao = resPubli.rows[0].id
			const tipoConteudo = anexo.nome.includes(".txt") ? "conteudo_texto" : "conteudo_binario"
			const query = {
				text: `INSERT INTO 
					${DB_INFO.tables.anexo} (titulo, ${tipoConteudo}, data_upload, id_entrega, id_publicacao_mural) 
				VALUES (
					$1, $2, NOW(), null, $3
				);`,
				values: [anexo.nome, anexo.conteudo, idPublicacao]
			}

			const resAnexo = await dbConn.query(query)
			if (!resAnexo) {
				throw (`Não foi possível salvar anexos da publicação`)
			}
		}

		await dbConn.query('COMMIT');
		}
	} catch (e) {
		await dbConn.query('ROLLBACK');
		throw (`Erro ao criar publicação: ${e}`)
	}
}
