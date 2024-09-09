
export async function load({ params }) {
	console.log('load turmas/id')
	console.log(params.id)
}

export const actions = {
	default: async () => {
		console.log("get turma by id")
	}
}
