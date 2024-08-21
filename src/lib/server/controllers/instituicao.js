import { getInstituicoesDB, getInstituicaoByNomeDB, getInstituicaoByIdDB } from "$repositories/instituicao"

export async function getInstituicoes() {
	let res = await getInstituicoesDB();
	let dict = { "instituicoes": res.rows }
	return dict
}

export async function getInstituicaoByNome(nome) {
	let res = await getInstituicaoByNomeDB(nome);
	if (res.rows.length > 0) {
		return res.rows[0]
	}

	return false
}

export async function getInstituicaoById(id) {
	let res = await getInstituicaoByIdDB(id);
	if (res.rows.length > 0) {
		return res.rows[0]
	}

	return false
}
