
export async function load({ fetch }) {
	let res = await fetch(`http://localhost:5173/api/database/instituicao`);
	return await res.json()
}
