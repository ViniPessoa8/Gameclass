import { getAtividadeById } from "$controllers/atividade";

export async function load({ cookies, params }) {
	const idAtividade = params.id
	const atividade = await getAtividadeById(idAtividade)

	return { "atividade": atividade }
}
