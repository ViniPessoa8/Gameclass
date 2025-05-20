import { redirect } from "@sveltejs/kit";

const rotasProtegidas = [
	'/professor',
	'/aluno',
];

export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');

	let usuario = null;

	if (session) {
		try {
			usuario = JSON.parse(session);
		} catch (_) {
			usuario = null;
		}
	}

	event.locals.usuario = usuario;

	const isRotaProtegida = rotasProtegidas.some((rota) =>
		event.url.pathname.startsWith(rota)
	);

	if (isRotaProtegida && !usuario) {
		throw redirect(302, '/');
	}

	if (event.url.pathname.startsWith('/.well-known/')) {
		return new Response('Not Found', { status: 404 });
	}

	return await resolve(event);
}

