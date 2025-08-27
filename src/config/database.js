import { Pool } from 'pg';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();
const pool = new Pool({
	// connectionString: process.env.DATABASE_URL,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	database: process.env.DATABASE_NAME,
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
