import { Pool } from 'pg';

const pool = new Pool({
	// connectionString: process.env.DATABASE_URL,
	user: import.meta.env.VITE_DATABASE_USER,
	password: import.meta.env.VITE_DATABASE_PASSWORD,
	host: import.meta.env.VITE_DATABASE_HOST,
	port: import.meta.env.VITE_DATABASE_PORT,
	database: import.meta.env.VITE_DATABASE_NAME,
	// Configurações opcionais:
	max: 10,               // Máximo de conexões simultâneas
	idleTimeoutMillis: 10000, // Tempo antes de uma conexão ociosa ser encerrada
	connectionTimeoutMillis: 2000 // Tempo máximo para tentar se conectar
});

pool.on('error', (err) => {
	console.error('Erro inesperado no pool do PostgreSQL:', err);
});

export function getPool() {
	return pool;
}
