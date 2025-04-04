
import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.delete('session', { path: '/' }); // ou o nome do seu cookie de auth
	redirect(303, '/login'); // ou qualquer rota que quiser redirecionar após logout
};
