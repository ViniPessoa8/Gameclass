import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
	const toast = cookies.get("toast")
	const session_raw = cookies.get("session");
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
		cookies.set("perfil", "professor", {
			path: '/',
			httpOnly: true,
			sameSite: true,
			secure: false
		})

		redirect(307, '/professor/turmas')

	},
	perfil_estudante: async ({ cookies }) => {
		cookies.set("perfil", "estudante", {
			path: '/',
			httpOnly: true,
			sameSite: true,
			secure: false
		})

		redirect(300, 'estudante/turmas')
	}
}
