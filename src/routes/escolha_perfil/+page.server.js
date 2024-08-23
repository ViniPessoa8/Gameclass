import { fail, redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
	const session_raw = cookies.get("session");
	const session = JSON.parse(session_raw);
	const username = session["login"]

	if (!cookies.get("session")) {
		console.log("Usuário não autenticado")
		redirect(300, "/")
	}

	return {
		username: username
	};
}

export const actions = {
	perfil_professor: async ({ cookies }) => {
		console.log("perfil_professor")
		cookies.set("perfil", "professor", {
			path: '/',
			httpOnly: true,
			sameSite: true,
			secure: false
		})

		// FIX: Redirect to '/turmas'
		return redirect(300, '/turmas')

	},
	perfil_estudante: async ({ cookies }) => {
		console.log("perfil_estudante")
		cookies.set("perfil", "estudante", {
			path: '/',
			httpOnly: true,
			sameSite: true,
			secure: false
		})

		// FIX: Redirect to '/turmas'
		redirect(300, '/turmas')
	}
}
