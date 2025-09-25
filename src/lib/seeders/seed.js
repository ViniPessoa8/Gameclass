import { getPool } from "../../config/database.js";
import dotenv from 'dotenv';
import { DB_INFO } from "../constants.js";
import { conquistas } from "./conquista-data.js";

dotenv.config();

const API_BASE_URL = process.env.ORIGIN || 'http://localhost:5173';

async function seedDatabase() {
	let db;
	try {
		console.log('Conectando ao banco de dados...');
		db = getPool();
		console.log('Conexão bem-sucedida.');

		const atribuicoesDeConquistas = {
			'Maior nota da Turma': [
				// Turma 1
				{ estudanteId: 5, turmaId: 1 },
				{ estudanteId: 2, turmaId: 1 },
				// Turma 2
				{ estudanteId: 1, turmaId: 2 },
				{ estudanteId: 9, turmaId: 2 },
				// Turma 3
				{ estudanteId: 3, turmaId: 3 },
				{ estudanteId: 7, turmaId: 3 }
			],
			'Quebrando o gelo': [
				// Turma 1
				{ estudanteId: 5, turmaId: 1 },
				{ estudanteId: 2, turmaId: 1 },
				// Turma 2
				{ estudanteId: 1, turmaId: 2 },
				{ estudanteId: 9, turmaId: 2 },
				// Turma 3
				{ estudanteId: 3, turmaId: 3 },
				{ estudanteId: 7, turmaId: 3 }
			]
		};

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

			if (atribuicoesDeConquistas[conquista.nome]) {
				const atribuicoes = atribuicoesDeConquistas[conquista.nome];

				for (const atribuicao of atribuicoes) {
					console.log(`-> Atribuindo conquista "${conquista.nome}" ao estudante ID: ${atribuicao.estudanteId} na turma ID: ${atribuicao.turmaId}...`);

					const queryLigacao = `
                        INSERT INTO conquista_estudante (id_estudante, id_conquista, id_turma)
                        VALUES ($1, $2, $3)
                        ON CONFLICT (id_estudante, id_conquista, id_turma)
                        DO NOTHING;
                    `;

					const valuesLigacao = [atribuicao.estudanteId, id_conquista, atribuicao.turmaId];
					await db.query(queryLigacao, valuesLigacao);
					console.log(`-> Atribuição concluída.`);
				}
			}
		}

		console.log('Seeding de conquistas concluído com sucesso!');

	} catch (error) {
		console.error('Falha no processo de seeding:', error);
		process.exit(1);
	} finally {
		if (db) {
			console.log('Processo de seeding finalizado.');
			db
		}
	}
}

seedDatabase();
