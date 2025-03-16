import { listaRankingPorIdTurma } from "$lib/server/controllers/ranking";

export async function load({ cookies, params }) {
	let data = {};
	const session_raw = cookies.get("session");
	const session = JSON.parse(session_raw);

	const ranking = await listaRankingPorIdTurma(params.id)

	data["ranking"] = ranking
	data["session"] = session

	return data
}

