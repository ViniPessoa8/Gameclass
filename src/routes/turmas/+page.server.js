
export function load({ cookies }) {
	const user = cookies.get("user");
	const session = cookies.get("session");

	console.log("/turmas user: ", user);
	console.log("/turmas session: ", session);
}
