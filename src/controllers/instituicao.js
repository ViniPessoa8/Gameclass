import { getInstituicoesDB } from "$repositories/instituicao"

export async function getInstituicoes(dbConn) {
	let res = await getInstituicoesDB(dbConn);
	let dict = { "instituicoes": res.rows }
	return dict
}
