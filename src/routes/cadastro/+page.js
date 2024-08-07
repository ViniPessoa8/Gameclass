export async function load({ fetch }) {
	let res = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/database/instituicao`);
	return await res.json()
}
