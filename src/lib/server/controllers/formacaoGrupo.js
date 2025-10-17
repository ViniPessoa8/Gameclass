import FormacaoGrupo from "../../models/FormacaoGrupo";
import { cadastraFormacaoBD, listaFormacoesPorIdItemAtividadeBD } from "../repositories/formacaoGrupo";
import { log } from "$lib/utils/logger"

export default class FormacaoGrupoController {
	async cadastra(dados) {
		log(`FormacaoGrupoController -> cadastra(${dados})`)
		const formacao = new FormacaoGrupo({ id_item_atividade: dados.id_item_atividade, numero_grupos: dados.numero_grupos, numero_alunos: dados.numero_alunos });

		const res = await cadastraFormacaoBD(
			formacao.id_item_atividade,
			formacao.numero_grupos,
			formacao.numero_alunos,
		);

		return res.rows[0]; // retorna o ID
	}

	async listaPorIdItemAtividade(idItemAtividade) {
		log(`FormacaoGrupoController -> listaPorIdItemAtividade(${idItemAtividade})`)
		const res = await listaFormacoesPorIdItemAtividadeBD(idItemAtividade)

		if (res.rows == 0) return

		return res.rows.map((f) => new FormacaoGrupo({ ...f }).toObject())

	}
}
