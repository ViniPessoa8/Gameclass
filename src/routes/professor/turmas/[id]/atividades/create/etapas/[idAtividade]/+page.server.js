import { redirect } from "@sveltejs/kit"

export let actions = {
	default: async ({ cookies, params, request, url }) => {
		redirect(300, `${url.pathname}/resumo/`)
	}
}
