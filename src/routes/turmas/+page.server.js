
export function load({ cookies }) {
	const session_raw = cookies.get("session");
	const perfil_raw = cookies.get("perfil");
	const session = JSON.parse(session_raw);
	session.perfil = perfil_raw

	return session



}
