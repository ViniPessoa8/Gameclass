import { getInstituicoes } from "$controllers/instituicao";

/** 
 * Lista todas as instituições cadastradas no banco de dados
 */
export async function GET(event) {
	let res = await getInstituicoes();
	return new Response(JSON.stringify(res))
}
