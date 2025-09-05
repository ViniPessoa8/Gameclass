import path from 'path';
import { getPool } from "../../config/database.js"
import dotenv from 'dotenv';
import { DB_INFO } from "../constants.js";
import { conquistas } from "./conquista-data.js"

dotenv.config();

const conquistasDir = path.join(process.cwd(), 'static', 'images', 'conquistas');
const API_BASE_URL = process.env.ORIGIN || 'http://localhost:5173';

async function seedDatabase() {
	let db;
	try {
		console.log('Conectando ao banco de dados...');
		const db = getPool();
		console.log('Conexão bem-sucedida.');

		console.log('Iniciando o processo de seeding de conquistas...');
		for (const conquista of conquistas) {
			const iconeUrl = `${API_BASE_URL}/conquistas/${conquista.arquivo_icone}`;

			const queryConquista = `
                INSERT INTO ${DB_INFO.tables.conquista} (nome, descricao, pontos_xp, emblema_url)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (nome) 
								DO UPDATE SET
									descricao = EXCLUDED.descricao,
									pontos_xp = EXCLUDED.pontos_xp,
									emblema_url = EXCLUDED.emblema_url
								RETURNING id;
			`;

			const valuesConquista = [conquista.nome, conquista.descricao, conquista.pontos_xp, iconeUrl];

			const res = await db.query(queryConquista, valuesConquista);
			const id_conquista = res.rows[0].id;

			console.log(`- Conquista "${conquista.nome}" (ID: ${id_conquista}) inserida/atualizada.`);

			let estudanteAlvoId = 6;
			let nomeConquistaAlvo = "Maior nota da Turma";
			let turmaAlvoId = 1;
			if (conquista.nome === nomeConquistaAlvo) {
				console.log(`-> Atribuindo conquista "${nomeConquistaAlvo}" ao estudante ID: ${estudanteAlvoId}...`);

				const queryLigacao = `
					INSERT INTO conquista_estudante (id_estudante, id_conquista, id_turma)
					VALUES ($1, $2, $3)
					ON CONFLICT (id_estudante, id_conquista, id_turma)
					DO NOTHING;
				`;

				const valuesLigacao = [estudanteAlvoId, id_conquista, turmaAlvoId];
				await db.query(queryLigacao, valuesLigacao);

			}

			estudanteAlvoId = 6;
			nomeConquistaAlvo = "Quebrando o gelo";
			turmaAlvoId = 1;
			if (conquista.nome === nomeConquistaAlvo) {
				console.log(`-> Atribuindo conquista "${nomeConquistaAlvo}" ao estudante ID: ${estudanteAlvoId}...`);

				const queryLigacao = `
					INSERT INTO conquista_estudante (id_estudante, id_conquista, id_turma)
					VALUES ($1, $2, $3)
					ON CONFLICT (id_estudante, id_conquista, id_turma)
					DO NOTHING;
				`;

				const valuesLigacao = [estudanteAlvoId, id_conquista, turmaAlvoId];
				await db.query(queryLigacao, valuesLigacao);

			}
			console.log(`-> Atribuição concluída.`);
		}

		console.log('Seeding de conquistas concluído com sucesso!');

	} catch (error) {
		console.error('Falha no processo de seeding:', error);
		process.exit(1);
	} finally {
		if (db) {
			await db.end();
			console.log('Conexão com o banco de dados fechada.');
		}
	}
}

seedDatabase();

