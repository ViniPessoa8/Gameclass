import { dbConn } from "$config/database.js"
import { DB_INFO } from "../../constants"

export async function cadastraItemAtividadeBD(titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividade) {
	const query = {
		text: `INSERT INTO ${DB_INFO.tables.item_atividade}(titulo, nota_max, data_entrega_inicial, data_entrega_final, tipo_atribuicao_nota, em_grupos, receber_apos_prazo, n_integrantes_grupo, n_max_grupos, id_atividade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
		values: [titulo, notaMax, dataEntregaInicial, dataEntregaFinal, tipoAtribuicaoNota, emGrupos, receberAposPrazo, nIntegrantesGrupo, nMaxGrupos, idAtividade]
	}

	try {
		const res = await dbConn.query(query)
		return res
	} catch (e) {
		throw (`Erro ao cadastrar novo item da atividade (${idAtividade}): ${e}`)
	}
}
