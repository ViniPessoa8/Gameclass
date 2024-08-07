import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		target: 'es2022'
	},
	server: {
		port: process.env.VITE_SERVER_PORT
	}
});
