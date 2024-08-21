import { getInstituicoesDB, getInstituicaoByNomeDB } from "$repositories/instituicao"

export async function getInstituicoes() {
	let res = await getInstituicoesDB();
	let dict = { "instituicoes": res.rows }
	return dict
}

export async function getInstituicaoByNome(nome) {
	let res = await getInstituicaoByNomeDB(nome);
	if (res.rows.length > 0) {
		return res.rows[0].id
	}

	return false
}
