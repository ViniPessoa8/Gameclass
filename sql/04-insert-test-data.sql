-- -- Usuários
-- INSERT INTO usuario("nome", "login", "hash", "salt", "bio", "email", "acumulo_xp", "nivel", "dt_nasc", "data_criacao", "ultimo_acesso", "cor") 
-- VALUES
-- 	-- Usuário de teste (Professor)
-- 	('Teste Magalhães', 'testalhães', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Nada a declarar', 'teste.magalhaes@uea.edu.br', 0, 0, '1999-12-06', '2024-09-10', '2024-09-10T23:51:53.764Z', 'D7854F'),
-- 	-- Estudantes
-- 	('nome', 'login', 'hash', 'salt', 'bio', 'email', 'acumulo_xp', 'nivel', 'dt_nasc', 'data_criacao', 'ultimo_acesso', 'cor'),
-- 	('Teste Magalhães', 'testalhães', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Nada a declarar', 'teste.magalhaes@uea.edu.br', 0, 0, '1999-12-06', '2024-09-10', '2024-09-10T23:51:53.764Z', 'D7854F');



-- ========= LIMPEZA DOS DADOS (ORDEM DE DEPENDÊNCIA INVERSA) =========
-- Deleta os dados existentes para evitar conflitos ao rodar o script novamente.
DELETE FROM config;
DELETE FROM conquista_estudante;
DELETE FROM conquista;
DELETE FROM pontuacao;
DELETE FROM comentario;
DELETE FROM anexo;
DELETE FROM avaliacao_integrante_criterio;
DELETE FROM avaliacao_criterio;
DELETE FROM realizar_avaliacao;
DELETE FROM entrega;
DELETE FROM integrante_grupo_de_alunos;
DELETE FROM grupo_de_alunos;
DELETE FROM formacao_grupo;
DELETE FROM criterio;
DELETE FROM tag;
DELETE FROM item_atividade;
DELETE FROM atividade;
DELETE FROM estudante_turma;
DELETE FROM estudante;
DELETE FROM publicacao_mural;
DELETE FROM turma;
DELETE FROM usuario;
DELETE FROM instituicao;

-- ========= RESET DAS SEQUÊNCIAS DE IDS =========
-- Garante que a contagem de IDs reinicie do 1 após a limpeza dos dados.
ALTER SEQUENCE instituicao_id_seq RESTART WITH 1;
ALTER SEQUENCE usuario_id_seq RESTART WITH 1;
ALTER SEQUENCE estudante_id_seq RESTART WITH 1;
ALTER SEQUENCE turma_id_seq RESTART WITH 1;
ALTER SEQUENCE estudante_turma_id_seq RESTART WITH 1;
ALTER SEQUENCE publicacao_mural_id_seq RESTART WITH 1;
ALTER SEQUENCE comentario_id_seq RESTART WITH 1;
ALTER SEQUENCE atividade_id_seq RESTART WITH 1;
ALTER SEQUENCE item_atividade_id_seq RESTART WITH 1;
ALTER SEQUENCE criterio_id_seq RESTART WITH 1;
ALTER SEQUENCE entrega_id_seq RESTART WITH 1;
ALTER SEQUENCE realizar_avaliacao_id_seq RESTART WITH 1;
ALTER SEQUENCE avaliacao_criterio_id_seq RESTART WITH 1;
ALTER SEQUENCE grupo_de_alunos_id_seq RESTART WITH 1;
ALTER SEQUENCE integrante_grupo_de_alunos_id_seq RESTART WITH 1;
ALTER SEQUENCE anexo_id_seq RESTART WITH 1;
ALTER SEQUENCE formacao_grupo_id_seq RESTART WITH 1;
ALTER SEQUENCE pontuacao_id_seq RESTART WITH 1;
ALTER SEQUENCE conquista_id_seq RESTART WITH 1;
ALTER SEQUENCE conquista_estudante_id_seq RESTART WITH 1;
ALTER SEQUENCE tag_id_seq RESTART WITH 1;
ALTER SEQUENCE avaliacao_integrante_criterio_id_seq RESTART WITH 1;


-- ========= INSTITUICAO, USUARIOS E PERFIS =========

-- Inserção de uma instituição base
INSERT INTO instituicao("id", "nome", "endereco", "email") VALUES
(1, 'Universidade do Estado do Amazonas', 'Av. Djalma Batista, 3578 - Flores', 'contato@uea.edu.br');
ALTER SEQUENCE instituicao_id_seq RESTART WITH 2;

-- Inserção de Usuários: 1 Professor e 14 Estudantes
INSERT INTO usuario("id", "nome", "login", "hash", "salt", "bio", "email", "acumulo_xp", "nivel", "dt_nasc", "data_criacao", "ultimo_acesso", "cor")
VALUES
    -- Professor (será referenciado em 'turma' pelo id_usuario = 1)
		(1, 'Prof. Alan Turing', 'alan.turing', '$2a$10$j8.A.sY43oUnp0z9aB5rAuq4a2yE2i.6N.jS12a1u3i2b4c5d6e7f', '$2a$10$j8.A.sY43oUnp0z9aB5rAu', 'Pai da computação e apaixonado por decifrar enigmas.', 'alan.turing@uea.edu.br', 1250, 15, '1912-06-23', '2024-08-01', '2025-09-23T08:00:00.000Z', '3D5A80'),
    -- Estudantes
    (2, 'Ada Lovelace', 'ada.lovelace', '$2a$10$XyZABCD12345KJHsdUqPObFlh123Ghv67YPLOpWZXQ', '$2a$10$XyZABCD12345KJHsdUqPO', 'Estudante de Sistemas de Informação.', 'ada.lovelace@uea.edu.br', 320, 4, '2003-12-10', '2024-08-15', '2025-09-22T10:00:00.000Z', 'C75B5B'),
    (3, 'Grace Hopper', 'grace.hopper', '$2a$10$MNOPQRST9876543JHKLZXVBNMP', '$2a$10$MNOPQRST9876543JHKLZX', 'Futura engenheira de software.', 'grace.hopper@uea.edu.br', 450, 5, '2002-09-09', '2024-08-15', '2025-09-21T14:30:00.000Z', '6A4CA3'),
    (4, 'Margaret Hamilton', 'margaret.hamilton', '$2a$10$UVWXYZ87654321LMNOPQRSTJHKL', '$2a$10$UVWXYZ87654321LMNO', 'Entusiasta por código e missões espaciais.', 'margaret.hamilton@uea.edu.br', 210, 3, '2004-08-17', '2024-08-16', '2025-09-23T11:00:00.000Z', 'D7854F'),
    (5, 'Tim Berners-Lee', 'tim.lee', '$2a$10$ASDFGHJKLQWERTYUIOPZXCVBNM', '$2a$10$ASDFGHJKLQWERTYUIO', 'Interessado em redes e na web.', 'tim.lee@uea.edu.br', 150, 2, '2003-06-08', '2024-08-16', '2025-09-20T18:00:00.000Z', '2E5D89'),
    (6, 'Linus Torvalds', 'linus.torvalds', '$2a$10$QAZWSXEDCRFV123456TGBYHN', '$2a$10$QAZWSXEDCRFV12345', 'Apenas um pinguim.', 'linus.torvalds@uea.edu.br', 500, 6, '2002-12-28', '2024-08-17', '2025-09-22T20:00:00.000Z', '5B7F34'),
    (7, 'Steve Wozniak', 'steve.woz', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Hardware é o que me move.', 'steve.woz@uea.edu.br', 180, 2, '2003-08-11', '2024-08-17', '2025-09-19T12:00:00.000Z', 'AD4D4D'),
    (8, 'Vint Cerf', 'vint.cerf', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Conectando o mundo.', 'vint.cerf@uea.edu.br', 90, 1, '2004-06-23', '2024-08-18', '2025-09-18T22:00:00.000Z', '7D63C2'),
    (9, 'Radia Perlman', 'radia.perlman', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Mãe da Internet.', 'radia.perlman@uea.edu.br', 250, 3, '2003-01-01', '2024-08-18', '2025-09-23T09:30:00.000Z', 'E09560'),
    (10, 'John Carmack', 'john.carmack', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Gráficos 3D e foguetes.', 'john.carmack@uea.edu.br', 600, 7, '2002-08-20', '2024-08-19', '2025-09-22T15:00:00.000Z', '789BC0');
ALTER SEQUENCE usuario_id_seq RESTART WITH 11;

-- Perfis Estudantes
INSERT INTO estudante("id", "matricula", "id_usuario", "acumulo_xp", "nivel") VALUES
(1, '20240001', 2, 320, 4),
(2, '20240002', 3, 450, 5),
(3, '20240003', 4, 210, 3),
(4, '20240004', 5, 150, 2),
(5, '20240005', 6, 500, 6),
(6, '20240006', 7, 180, 2),
(7, '20240007', 8, 90, 1),
(8, '20240008', 9, 250, 3),
(9, '20240009', 10, 600, 7);
ALTER SEQUENCE estudante_id_seq RESTART WITH 10;


-- ========= TURMAS DO PROF. ALAN TURING (usuario.id = 1) =========

INSERT INTO turma("codigo", "nome", "disciplina", "ano", "periodo", "cor", "descricao", "numero_alunos", "id_professor", "id_instituicao") VALUES
('TIN2025BD1', 'Banco de Dados', 'Sistemas de Informação', 2025, 2, '4682B4', 'Turma focada em modelagem, SQL e NoSQL.', 5, 1, 1),
('TIN2025ES2', 'Engenharia de Software II', 'Engenharia de Software', 2025, 2, '6B8E23', 'Foco em padrões de projeto, arquitetura e testes.', 5, 1, 1),
('TIN2025AA1', 'Algoritmos Avançados', 'Ciência da Computação', 2025, 2, 'CD5C5C', 'Análise de complexidade e estruturas de dados complexas.', 5, 1, 1);
ALTER SEQUENCE turma_id_seq RESTART WITH 4;


-- ========= MATRÍCULA DE ESTUDANTES NAS TURMAS =========

-- Estudantes em Banco de Dados (Turma 1)
INSERT INTO estudante_turma("id_estudante", "id_turma", "pontos") VALUES
(1, 1, 250), (2, 1, 300), (3, 1, 180), (4, 1, 120), (5, 1, 400);

-- Estudantes em Engenharia de Software (Turma 2)
INSERT INTO estudante_turma("id_estudante", "id_turma", "pontos") VALUES
(2, 2, 220), (5, 2, 350), (6, 2, 150), (8, 2, 200), (9, 2, 450);

-- Estudantes em Algoritmos Avançados (Turma 3)
INSERT INTO estudante_turma("id_estudante", "id_turma", "pontos") VALUES
(1, 3, 100), (3, 3, 150), (5, 3, 200), (7, 3, 50), (9, 3, 300);
ALTER SEQUENCE estudante_turma_id_seq RESTART WITH 20; -- Valor arbitrário para segurança


-- ========= CENÁRIOS E ATIVIDADES POR TURMA =========

-- ==========================================================
-- == CENÁRIO 1: TURMA DE BANCO DE DADOS (ID 1)
-- == Foco: Atividade individual, avaliações já realizadas e mural ativo.
-- ==========================================================

-- Mural de Publicações (Turma 1)
INSERT INTO publicacao_mural("conteudo", "data_publicacao", "id_turma", "id_usuario") VALUES
('Pessoal, bem-vindos à disciplina de Banco de Dados! O plano de ensino já está disponível na plataforma.', (CURRENT_DATE - INTERVAL '15 days') + TIME '09:00:00', 1, 1),
('Professor, o material da Aula 02 será disponibilizado quando?', (CURRENT_DATE - INTERVAL '10 days') + TIME '11:30:00', 1, 2),
('Alguém com dúvida na questão 3 da lista de SQL?', (CURRENT_DATE - INTERVAL '5 days') + TIME '18:00:00', 1, 4);

-- Comentários no Mural (Turma 1)
INSERT INTO comentario("texto", "id_publicacao_mural", "id_usuario", "data_criacao") VALUES
('Olá, Ada! O material será postado até o fim do dia de hoje.', 2, 1, (CURRENT_DATE - INTERVAL '10 days') + TIME '12:00:00'),
('Obrigada, professor!', 2, 2, (CURRENT_DATE - INTERVAL '10 days') + TIME '12:05:00'),
('Eu, Tim! A cláusula JOIN está um pouco confusa.', 3, 3, (CURRENT_DATE - INTERVAL '5 days') + TIME '18:15:00'),
('Podemos marcar um horário para estudarmos juntos, se quiser.', 3, 4, (CURRENT_DATE - INTERVAL '5 days') + TIME '18:20:00');

-- Atividade e Itens (Turma 1)
INSERT INTO atividade("titulo", "descricao", "prazo", "id_turma") VALUES
('Modelagem e SQL', 'Exercícios sobre modelagem ER e consultas SQL.', '2026-10-15T23:59:59.000Z', 1);

INSERT INTO item_atividade("titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "status", "id_atividade") VALUES
('Lista de Exercícios 1: SQL Básico', 'Resolva as 10 questões de SQL propostas.', 10, '2025-09-20T08:00:00.000Z', '2025-09-30T23:59:59.000Z', 1, 1, false, false, 'ENCERRADO', 1);

-- Critérios da Atividade (Item 1)
INSERT INTO criterio("titulo", "descricao", "pontuacao_max", "peso", "id_item_atividade") VALUES
('Correção das Consultas', 'As queries SQL retornam o resultado esperado.', 5, 1, 1),
('Boas Práticas', 'Uso de indentação, nomes de alias e clareza do código.', 5, 1, 1);

-- Entregas dos Alunos (Item 1)
INSERT INTO entrega("id_estudante", "id_item_atividade", "data_entrega") VALUES
(1, 1, '2025-09-28 10:00:00'), -- Ada
(2, 1, '2025-09-29 15:30:00'), -- Grace
(3, 1, '2025-09-30 23:50:00'); -- Margaret

-- Avaliações feitas pelo professor (Item 1)
INSERT INTO realizar_avaliacao(data_avaliacao, id_entrega) VALUES
(now(), 1), -- Avaliação da Ada
(now(), 2); -- Avaliação da Grace

INSERT INTO avaliacao_criterio (id_realizar_avaliacao, id_criterio, nota_atribuida) VALUES
(1, 1, 4.5), (1, 2, 5.0), -- Notas da Ada
(2, 1, 4.0), (2, 2, 3.5); -- Notas da Grace


-- ==========================================================
-- == CENÁRIO 2: TURMA DE ENGENHARIA DE SOFTWARE (ID 2)
-- == Foco: Atividade em grupo com avaliação por grupo.
-- ==========================================================

INSERT INTO publicacao_mural("conteudo", "data_publicacao", "id_turma", "id_usuario") VALUES
('Turma, a data de entrega do trabalho sobre Padrões de Projeto foi prorrogada. Verifiquem no sistema.', (CURRENT_DATE - INTERVAL '7 days') + TIME '14:00:00', 2, 1);

INSERT INTO atividade("titulo", "descricao", "prazo", "id_turma") VALUES
('Padrões de Projeto', 'Implementação de Padrões de Projeto GoF.', '2026-11-20T23:59:59.000Z', 2);

INSERT INTO item_atividade("titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "status", "id_atividade", "tipo_formacao_grupo") VALUES
('Seminário: Design Patterns', 'Apresentar um padrão de projeto para a turma.', 10, '2026-10-10T08:00:00.000Z', '2026-10-25T23:59:59.000Z', 1, 2, true, false, 'LIBERADO', 2, 1);

INSERT INTO criterio("titulo", "descricao", "pontuacao_max", "peso", "id_item_atividade") VALUES
('Domínio do Conteúdo', 'Demonstração de entendimento profundo do padrão.', 5, 1, 2),
('Qualidade da Apresentação', 'Clareza, didática e qualidade dos slides.', 5, 1, 2);

INSERT INTO grupo_de_alunos (nome, id_item_atividade) VALUES ('Grupo Singleton', 2), ('Grupo Factory', 2);
INSERT INTO integrante_grupo_de_alunos (id_estudante, id_grupo_de_alunos) VALUES (2, 1), (5, 1), (6, 2), (8, 2), (9, 2);
INSERT INTO entrega ("id_grupo_de_alunos", "id_item_atividade", "data_entrega") VALUES (1, 2, '2026-10-24 20:00:00');
INSERT INTO realizar_avaliacao(data_avaliacao, id_entrega) VALUES (now(), 4);
INSERT INTO avaliacao_criterio (id_realizar_avaliacao, id_criterio, nota_atribuida) VALUES (3, 3, 4.0), (3, 4, 4.5);


-- ==========================================================
-- == CENÁRIO 3: TURMA DE ALGORITMOS AVANÇADOS (ID 3)
-- == Foco: Atividade com nota ponderada e uma atividade futura (não liberada).
-- ==========================================================
INSERT INTO publicacao_mural("conteudo", "data_publicacao", "id_turma", "id_usuario") VALUES
('Desafio da semana: resolvam o problema do caixeiro viajante usando uma heurística. Não vale nota, mas vale XP!', (CURRENT_DATE - INTERVAL '3 days') + TIME '10:00:00', 3, 1);

INSERT INTO atividade("titulo", "descricao", "prazo", "id_turma") VALUES
('Análise de Complexidade', 'Atividades práticas sobre complexidade de algoritmos.', '2026-12-01T23:59:59.000Z', 3);

INSERT INTO item_atividade("titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "status", "id_atividade") VALUES
('Prova 1: Análise Assintótica', 'Prova sobre notações Big-O, Omega e Theta.', 10, '2026-11-05T08:00:00.000Z', '2026-11-12T23:59:59.000Z', 2, 1, false, false, 'LIBERADO', 3),
('Trabalho Final: Grafos', 'Implementação de um algoritmo de caminho mínimo.', 10, '2026-11-20T08:00:00.000Z', '2026-12-05T23:59:59.000Z', 1, 1, false, false, 'NÃO LIBERADO', 3);

INSERT INTO criterio("titulo", "descricao", "pontuacao_max", "peso", "id_item_atividade") VALUES
('Questões Teóricas', 'Definições e conceitos.', 10, 3, 3), ('Questões Práticas', 'Análise de algoritmos.', 10, 7, 3);
INSERT INTO entrega("id_estudante", "id_item_atividade", "data_entrega") VALUES (5, 3, '2026-11-10 12:00:00'), (9, 3, '2026-11-11 09:45:00');


-- ========= CONFIGURAÇÕES E ATUALIZAÇÃO DE SEQUENCES =========

-- Reinicia as sequências para evitar conflitos futuros
ALTER SEQUENCE atividade_id_seq RESTART WITH 4;
ALTER SEQUENCE item_atividade_id_seq RESTART WITH 5;
ALTER SEQUENCE criterio_id_seq RESTART WITH 7;
ALTER SEQUENCE publicacao_mural_id_seq RESTART WITH 5;
ALTER SEQUENCE comentario_id_seq RESTART WITH 5;
ALTER SEQUENCE entrega_id_seq RESTART WITH 7;
ALTER SEQUENCE realizar_avaliacao_id_seq RESTART WITH 4;
ALTER SEQUENCE avaliacao_criterio_id_seq RESTART WITH 5;
ALTER SEQUENCE grupo_de_alunos_id_seq RESTART WITH 3;
ALTER SEQUENCE integrante_grupo_de_alunos_id_seq RESTART WITH 6;

-- Configurações gerais do sistema
INSERT INTO config("chave", "valor") VALUES ('MAX_ETAPAS_POR_ATIVIDADE', '5');
