import InstituicaoController from "$lib/server/controllers/instituicao";

const instituicaoController = new InstituicaoController()

/** 
 * Lista todas as instituições cadastradas no banco de dados
 */
export async function GET(event) {
	let res = await instituicaoController.listar();
	return new Response(JSON.stringify(res))
}
