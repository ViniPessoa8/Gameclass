import path from 'path';
import { getPool } from "../../config/database.js"
import dotenv from 'dotenv';
import { DB_INFO } from "../constants.js";

import { conquistas } from "./conquista-data.js"

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Caminho para a pasta onde estão as imagens
const conquistasDir = path.join(process.cwd(), 'static', 'images', 'conquistas');

// A URL base da sua API, que também viria de variáveis de ambiente
const API_BASE_URL = process.env.ORIGIN || 'http://localhost:5173';


async function seedDatabase() {
	let db;
	try {
		console.log('Conectando ao banco de dados...');
		const db = getPool();
		// connection = await mysql.createConnection(dbConfig);
		console.log('Conexão bem-sucedida.');

		console.log('Iniciando o processo de seeding de conquistas...');
		for (const conquista of conquistas) {
			// Constrói a URL completa para o ícone.
			// O caminho deve corresponder a como você serve os arquivos estáticos no Express.
			// Ex: app.use('/static', express.static('public'));
			const iconeUrl = `${API_BASE_URL}/conquistas/${conquista.arquivo_icone}`;

			// Query SQL para inserir.
			// Usamos "ON DUPLICATE KEY UPDATE" para que, se você rodar o script de novo,
			// ele atualize os dados em vez de dar erro por duplicidade (baseado em uma chave UNIQUE no 'nome').
			// Certifique-se de que a coluna 'nome' na sua tabela 'Conquistas' é UNIQUE.
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

			// Executa a query e pega o resultado
			const res = await db.query(queryConquista, valuesConquista);
			const id_conquista = res.rows[0].id; // O ID da conquista inserida/atualizada

			console.log(`- Conquista "${conquista.nome}" (ID: ${id_conquista}) inserida/atualizada.`);

			// --- LÓGICA DE ATRIBUIÇÃO ---
			// Defina o ID do estudante que receberá a conquista de exemplo.
			let estudanteAlvoId = 6;
			// Defina o nome da conquista que será atribuída.
			let nomeConquistaAlvo = "Maior nota da Turma";
			// Defina o ID da turma que será atribuída.
			let turmaAlvoId = 1;
			// Se a conquista atual for a que queremos atribuir, fazemos a ligação.
			if (conquista.nome === nomeConquistaAlvo) {
				console.log(`-> Atribuindo conquista "${nomeConquistaAlvo}" ao estudante ID: ${estudanteAlvoId}...`);

				// Query 2: Insere a ligação na tabela conquista_estudante.
				const queryLigacao = `
					INSERT INTO conquista_estudante (id_estudante, id_conquista, id_turma)
					VALUES ($1, $2, $3)
					ON CONFLICT (id_estudante, id_conquista, id_turma)
					DO NOTHING;
				`;
				// ON CONFLICT ... DO NOTHING: Se a ligação já existir, não faz nada.

				const valuesLigacao = [estudanteAlvoId, id_conquista, turmaAlvoId];
				await db.query(queryLigacao, valuesLigacao);

			}

			// Defina o ID do estudante que receberá a conquista de exemplo.
			estudanteAlvoId = 6;
			// Defina o nome da conquista que será atribuída.
			nomeConquistaAlvo = "Quebrando o gelo";
			// Defina o ID da turma que será atribuída.
			turmaAlvoId = 1;
			// Se a conquista atual for a que queremos atribuir, fazemos a ligação.
			if (conquista.nome === nomeConquistaAlvo) {
				console.log(`-> Atribuindo conquista "${nomeConquistaAlvo}" ao estudante ID: ${estudanteAlvoId}...`);

				// Query 2: Insere a ligação na tabela conquista_estudante.
				const queryLigacao = `
					INSERT INTO conquista_estudante (id_estudante, id_conquista, id_turma)
					VALUES ($1, $2, $3)
					ON CONFLICT (id_estudante, id_conquista, id_turma)
					DO NOTHING;
				`;
				// ON CONFLICT ... DO NOTHING: Se a ligação já existir, não faz nada.

				const valuesLigacao = [estudanteAlvoId, id_conquista, turmaAlvoId];
				await db.query(queryLigacao, valuesLigacao);

			}
			console.log(`-> Atribuição concluída.`);
		}

		console.log('Seeding de conquistas concluído com sucesso!');

	} catch (error) {
		console.error('Falha no processo de seeding:', error);
		process.exit(1); // Sai do processo com código de erro
	} finally {
		if (db) {
			await db.end();
			console.log('Conexão com o banco de dados fechada.');
		}
	}
}


// Executa a função
seedDatabase();
