import { redirect } from '@sveltejs/kit';

export function load({ params }) {
	throw redirect(302, `/professor/turmas/${params.id}/atividades`);
}
