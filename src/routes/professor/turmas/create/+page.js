
export async function load({ fetch }) {
	let res = await fetch(`/api/database/instituicao`);
	return await res.json()
}
