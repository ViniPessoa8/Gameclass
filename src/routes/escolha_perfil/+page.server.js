import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
	console.debug("[SERVER/ESCOLHA_PERFIL]")
	const toast = cookies.get("toast")
	const session_raw = cookies.get("session");
	if (!session_raw) {
		console.log("Usuário não autenticado")
		redirect(300, "/")
	}

	const session = JSON.parse(session_raw);
	const username = session["login"]

	let resObject = {
		username: username,
	}

	if (toast) {
		resObject.toast = toast
		cookies.set("toast", "", { path: '/' })
	}

	return resObject;

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

		redirect(307, '/autenticado/turmas')

	},
	perfil_estudante: async ({ cookies }) => {
		console.log("perfil_estudante")
		cookies.set("perfil", "estudante", {
			path: '/',
			httpOnly: true,
			sameSite: true,
			secure: false
		})

		redirect(300, 'autenticado/turmas')
	}
}
