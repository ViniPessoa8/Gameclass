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
		(1, 'Prof. Alan Turing', 'alan.turing', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Pai da computação e apaixonado por decifrar enigmas.', 'alan.turing@uea.edu.br', 1250, 15, '1912-06-23', '2024-08-01', '2025-09-23T08:00:00.000Z', '3D5A80'),
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
('TIN2025ES2', 'Engenharia de Software II', 'Engenharia de Software', 2025, 2, '6B8E23', 'Foco em padrões de projeto, arquitetura e testes.', 5, 1, 1);
-- ('TIN2025AA1', 'Algoritmos Avançados', 'Ciência da Computação', 2025, 2, 'CD5C5C', 'Análise de complexidade e estruturas de dados complexas.', 5, 1, 1);
ALTER SEQUENCE turma_id_seq RESTART WITH 4;


-- ========= MATRÍCULA DE ESTUDANTES NAS TURMAS =========

-- Estudantes em Banco de Dados (Turma 1)
INSERT INTO estudante_turma("id_estudante", "id_turma", "pontos") VALUES
(1, 1, 250), (2, 1, 300), (3, 1, 180), (4, 1, 120), (5, 1, 400);

-- Estudantes em Engenharia de Software (Turma 2)
INSERT INTO estudante_turma("id_estudante", "id_turma", "pontos") VALUES
(2, 2, 220), (5, 2, 350), (6, 2, 150), (8, 2, 200), (9, 2, 450);

-- Estudantes em Algoritmos Avançados (Turma 3)
-- INSERT INTO estudante_turma("id_estudante", "id_turma", "pontos") VALUES
-- (1, 3, 100), (3, 3, 150), (5, 3, 200), (7, 3, 50), (9, 3, 300);
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


-- ========= TURMA 1 (BANCO DE DADOS): FOCO EM ATIVIDADES INDIVIDUAIS =========

-- --- Atividade 1: Individual, Encerrada e Avaliada ---
INSERT INTO atividade("id", "titulo", "prazo", "id_turma") VALUES (1, 'Modelagem Relacional Avançada', '2025-10-01T23:59:59.000Z', 1);
-- Etapa 1
INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
VALUES (1, 'Lista de Exercícios: Normalização', 'Aplique as formas normais (1FN, 2FN, 3FN) nos modelos de dados apresentados.', 10, '2025-09-20T08:00:00.000Z', '2025-09-30T23:59:59.000Z', 0, 1, false, false, 1);
INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "id_item_atividade") VALUES 
(1, 'Aplicação da 1FN e 2FN', 'Identificação e correção de anomalias.', 5, 1), 
(2, 'Aplicação da 3FN', 'Remoção de dependências transitivas.', 5, 1);
INSERT INTO entrega("id", "id_estudante", "id_item_atividade") VALUES (1, 1, 1), (2, 2, 1);
INSERT INTO realizar_avaliacao("id", "id_entrega") VALUES (1, 1), (2, 2);
INSERT INTO avaliacao_criterio ("id", "id_realizar_avaliacao", "id_criterio", "nota_atribuida") VALUES 
(1, 1, 1, 5.0), (2, 1, 2, 4.5), -- Notas Estudante 1
(3, 2, 1, 4.0), (4, 2, 2, 3.5); -- Notas Estudante 2

-- --- Atividade 2: Individual, Liberada, Aguardando Entregas ---
INSERT INTO atividade("id", "titulo", "prazo", "id_turma") VALUES (2, 'Consultas SQL Complexas', '2025-10-16T23:59:59.000Z', 1);
INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
VALUES (2, 'Desafio: Otimização de Queries', 'Refatore as consultas SQL fornecidas para melhorar o desempenho, utilizando índices e joins eficientes.', 10, '2025-10-05T08:00:00.000Z', '2025-10-15T23:59:59.000Z', 0, 1, false, false, 2);
INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "id_item_atividade") VALUES 
(3, 'Uso de Índices', 'Criação de índices adequados para as consultas.', 4, 2), 
(4, 'Refatoração de Joins', 'Substituição de subqueries por joins quando aplicável.', 4, 2),
(5, 'Plano de Execução', 'Análise e justificativa da melhoria do plano de execução.', 2, 2);


-- ========= TURMA 2 (ENGENHARIA DE SOFTWARE): FOCO EM ATIVIDADES EM GRUPO =========

-- --- Atividade 3: Em Grupo, Nota Coletiva, Encerrada e Avaliada ---
INSERT INTO atividade("id", "titulo", "prazo", "id_turma") VALUES (3, 'Padrões de Projeto (GoF)', '2025-11-01T23:59:59.000Z', 2);
INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
VALUES (3, 'Apresentação: Padrão Decorator', 'Criar uma apresentação e um exemplo prático do padrão de projeto Decorator.', 10, '2025-10-20T08:00:00.000Z', '2025-10-30T23:59:59.000Z', 0, 2, true, false, 3);
INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "id_item_atividade", "peso") VALUES 
(6, 'Clareza Conceitual', 'Apresentação clara da finalidade e estrutura do padrão.', 5, 3, 3), 
(7, 'Qualidade do Exemplo', 'O código de exemplo é funcional e didático.', 5, 3, 2);
INSERT INTO formacao_grupo("id", "numero_grupos", "numero_alunos", "id_item_atividade") VALUES (1, 2, 3, 3);
INSERT INTO grupo_de_alunos("id", "nome", "id_item_atividade") VALUES (1, 'Grupo Design Patterns', 3);
INSERT INTO integrante_grupo_de_alunos("id_estudante", "id_grupo_de_alunos") VALUES (2, 1), (3, 1);
-- INSERT INTO entrega("id", "id_grupo_de_alunos", "id_item_atividade") VALUES (3, 1, 3);
-- INSERT INTO realizar_avaliacao("id", "id_entrega") VALUES (3, 3);
-- INSERT INTO avaliacao_criterio("id", "id_realizar_avaliacao", "id_criterio", "nota_atribuida") VALUES 
-- (5, 3, 6, 4.5), (6, 3, 7, 5.0); -- Nota coletiva para o grupo

-- --- Atividade 4: Em Grupo, Nota Individual, Entregue e Aguardando Avaliação ---
INSERT INTO atividade("id", "titulo", "prazo", "id_turma") VALUES (4, 'Metodologias Ágeis', '2025-11-21T23:59:59.000Z', 2);
INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
VALUES (4, 'Simulação de Sprint (Scrum)', 'Planejar e executar uma Sprint de uma semana para um projeto fictício, entregando o Sprint Backlog e a Review.', 10, '2025-09-10T08:00:00.000Z', '2025-11-20T23:59:59.000Z', 0, 1, true, false, 4);
INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "id_item_atividade", "peso") VALUES 
(8, 'Qualidade do Planejamento', 'O Sprint Backlog está bem definido e estimado.', 5, 4, 3), 
(9, 'Execução e Entrega', 'As tarefas foram concluídas e apresentadas na Review.', 5, 4, 2);
INSERT INTO formacao_grupo("id", "numero_grupos", "numero_alunos", "id_item_atividade") VALUES (2, 2, 3, 4);
INSERT INTO grupo_de_alunos("id", "nome", "id_item_atividade") VALUES (2, 'Scrum Masters', 4);
INSERT INTO integrante_grupo_de_alunos("id_estudante", "id_grupo_de_alunos") VALUES (4, 2), (5, 2), (7, 2);
INSERT INTO entrega("id", "id_grupo_de_alunos", "id_item_atividade") VALUES (4, 2, 4);
-- Nenhuma avaliação ainda, para simular trabalho pendente para o professor.


-- ========= TURMA 3 (ALGORITMOS AVANÇADOS): CENÁRIOS MISTOS =========

-- -- --- Atividade 5: Individual, Ponderada, Encerrada e Parcialmente Avaliada ---
-- INSERT INTO atividade("id", "titulo", "prazo", "id_turma") VALUES (5, 'Análise de Complexidade', '2025-10-21T23:59:59.000Z', 3);
-- INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
-- VALUES (5, 'Prova 1: Notação Big-O', 'Análise de complexidade de algoritmos iterativos e recursivos.', 10, '2025-09-10T08:00:00.000Z', '2025-10-20T23:59:59.000Z', 2, 1, false, false, 5);
-- INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "peso", "id_item_atividade") VALUES 
-- (10, 'Questões Teóricas', 'Definições de Big-O, Omega e Theta.', 10, 3, 5), -- Peso 3
-- (11, 'Questões Práticas', 'Análise de código e cálculo de complexidade.', 10, 7, 5); -- Peso 7
-- INSERT INTO entrega("id", "id_estudante", "id_item_atividade") VALUES (5, 1, 5), (6, 3, 5);
-- INSERT INTO realizar_avaliacao("id", "id_entrega") VALUES (4, 5);
-- INSERT INTO avaliacao_criterio("id", "id_realizar_avaliacao", "id_criterio", "nota_atribuida") VALUES 
-- (7, 4, 10, 8.0), (8, 4, 11, 9.5); -- Apenas o estudante 1 foi avaliado.
--
-- -- --- Atividade 6: Em Grupo, Liberada, Aguardando Entregas ---
-- INSERT INTO atividade("id", "titulo", "prazo", "id_turma") VALUES (6, 'Estruturas de Dados Avançadas', '2025-11-16T23:59:59.000Z', 3);
-- INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
-- VALUES (6, 'Implementação: Grafos e Caminho Mínimo', 'Implementar o algoritmo de Dijkstra para encontrar o menor caminho em um grafo.', 10, '2025-11-05T08:00:00.000Z', '2025-11-15T23:59:59.000Z', 1, 2, true, false, 6);
-- INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "id_item_atividade") VALUES 
-- (12, 'Corretude da Implementação', 'O algoritmo produz o resultado correto para os casos de teste.', 7, 6), 
-- (13, 'Performance', 'O código é eficiente e não possui gargalos óbvios.', 3, 6);
-- INSERT INTO formacao_grupo("id", "numero_grupos", "numero_alunos", "id_item_atividade") VALUES (3, 2, 2, 6);
-- INSERT INTO grupo_de_alunos("id", "nome", "id_item_atividade") VALUES (3, 'Team Dijkstra', 6), (4, 'Grafos Masters', 6);
-- INSERT INTO integrante_grupo_de_alunos("id_estudante", "id_grupo_de_alunos") VALUES (1, 3), (3, 3), (5, 4), (8, 4);
--
-- -- --- Atividade 7: Individual, Futura/Agendada ---
-- INSERT INTO atividade("id", "titulo", "prazo", "id_turma") VALUES (7, 'Algoritmos de Ordenação', '2025-12-01T23:59:59.000Z', 3);
-- INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
-- VALUES (7, 'Comparativo: QuickSort vs. MergeSort', 'Implemente ambos os algoritmos e compare seus tempos de execução para diferentes tamanhos de entrada.', 10, '2025-11-20T08:00:00.000Z', '2025-11-30T23:59:59.000Z', 1, 1, false, false, 7);
-- INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "id_item_atividade") VALUES 
-- (14, 'Implementação do QuickSort', 'O código deve ser funcional e correto.', 5, 7), 
-- (15, 'Implementação do MergeSort', 'O código deve ser funcional e correto.', 5, 7);

-- =====================================================================
-- == INÍCIO: COMPLEMENTO COM 4 CENÁRIOS DE ETAPAS EM UMA SÓ ATIVIDADE
-- =====================================================================

-- Criamos uma única atividade principal na TURMA 1 (Banco de Dados) que servirá como contêiner para todas as etapas.
INSERT INTO atividade("id", "titulo", "descricao", "prazo", "id_turma")
VALUES (
    8,
    'Projeto Final: Desenvolvimento de um Sistema de Banco de Dados Completo',
    'Este projeto abrange todas as fases do desenvolvimento de um banco de dados, da modelagem à implementação e consulta.',
    '2025-11-15T23:59:59.000Z', -- Prazo final da última etapa
    1
);

-- ---
-- ETAPA 1: CONCLUÍDA
-- Descrição: A primeira fase do projeto. O prazo já passou, os alunos entregaram e o professor já avaliou.
-- ---
INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
VALUES (
    8,
    'Etapa 1: Modelagem Lógica e Relacional',
    'Entregar o diagrama Entidade-Relacionamento (MER) e o Modelo Relacional derivado (tabelas e chaves).',
    10,
    '2025-08-20T08:00:00.000Z',
    '2025-09-05T23:59:59.000Z',
    0, 1, false, false, 8 -- Pertence à atividade "Projeto Final" (id=8)
);
INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "id_item_atividade") VALUES
(16, 'Qualidade do MER', 'O diagrama representa corretamente as entidades e relacionamentos.', 5, 8),
(17, 'Correção do Modelo Relacional', 'As tabelas, chaves primárias e estrangeiras estão corretamente definidas.', 5, 8);
INSERT INTO entrega("id", "id_estudante", "id_item_atividade") VALUES (7, 1, 8), (8, 2, 8);
INSERT INTO anexo ("titulo", "conteudo_texto", "id_entrega") VALUES ('MER_Ada.pdf', NULL, 7), ('Modelo_Relacional_Grace.zip', NULL, 8);
INSERT INTO realizar_avaliacao("id", "id_entrega") VALUES (5, 7), (6, 8);
INSERT INTO avaliacao_criterio ("id", "id_realizar_avaliacao", "id_criterio", "nota_atribuida") VALUES
(9, 5, 16, 5.0), (10, 5, 17, 4.5), -- Notas da Entrega 7 (Ada)
(11, 6, 16, 4.0), (12, 6, 17, 4.0); -- Notas da Entrega 8 (Grace)

-- ---
-- ETAPA 2: PENDENTE (com entrega feita, sem avaliação)
-- Descrição: A segunda fase. O prazo acabou, os alunos entregaram, mas o professor ainda não corrigiu.
-- ---
INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
VALUES (
    9,
    'Etapa 2: Implementação e Carga de Dados',
    'Entregar os scripts SQL (DDL) para criação do banco de dados e (DML) para inserção de dados de teste.',
    10,
    '2025-09-06T08:00:00.000Z',
    '2025-09-20T23:59:59.000Z',
    1, 1, false, false, 8 -- Pertence à atividade "Projeto Final" (id=8)
);
INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "peso", "id_item_atividade") VALUES
(18, 'Correção do Script DDL', 'O script cria todas as tabelas e restrições conforme o modelo.', 5, 2, 9),
(19, 'Qualidade dos Dados (DML)', 'Os dados inseridos são coerentes e cobrem diversos cenários.', 5, 1, 9);
INSERT INTO entrega("id", "id_estudante", "id_item_atividade") VALUES (9, 1, 9), (10, 2, 9);
INSERT INTO anexo ("titulo", "conteudo_texto", "id_entrega") VALUES ('scripts_ddl_dml_ada.sql', NULL, 9), ('carga_dados_grace.sql', NULL, 10);
-- NENHUMA avaliação é criada para simular a pendência.

-- ---
-- ETAPA 3: LANÇADA (sem entregas)
-- Descrição: A fase atual do projeto. Está aberta para entregas, mas nenhum aluno enviou ainda.
-- ---
INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
VALUES (
    10,
    'Etapa 3: Criação de Consultas Complexas',
    'Desenvolver 5 consultas SQL que extraiam informações relevantes do banco de dados, utilizando joins, subqueries e agregações.',
    10,
    -- Data inicial no passado e final no futuro
    (CURRENT_DATE - INTERVAL '7 days'), -- Liberada há uma semana
    (CURRENT_DATE + INTERVAL '7 days'), -- Prazo termina em uma semana
    0, 1, false, false, 8 -- Pertence à atividade "Projeto Final" (id=8)
);
INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "id_item_atividade") VALUES
(20, 'Complexidade das Consultas', 'As consultas demonstram conhecimento avançado de SQL.', 5, 10),
(21, 'Relevância da Informação', 'As consultas extraem dados úteis e respondem a perguntas de negócio.', 5, 10);
-- NENHUMA entrega é criada, pois os alunos ainda estão trabalhando.

-- ---
-- ETAPA 4: AGENDADA
-- Descrição: A fase final do projeto, que ainda não foi liberada para os alunos.
-- ---
INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "tipo_avaliacao_nota", "em_grupos", "receber_apos_prazo", "id_atividade")
VALUES (
    11,
    'Etapa 4: Apresentação Final e Relatório',
    'Apresentar o projeto completo para a turma e entregar um relatório técnico detalhando as decisões de projeto.',
    10,
    -- Datas totalmente no futuro
    (CURRENT_DATE + INTERVAL '8 days'),
    (CURRENT_DATE + INTERVAL '20 days'),
    0, 1, false, false, 8 -- Pertence à atividade "Projeto Final" (id=8)
);
INSERT INTO criterio("id", "titulo", "descricao", "pontuacao_max", "id_item_atividade") VALUES
(22, 'Qualidade da Apresentação', 'Clareza, organização e domínio do conteúdo apresentado.', 5, 11),
(23, 'Qualidade do Relatório Técnico', 'O documento é bem escrito, detalhado e profissional.', 5, 11);
-- NENHUMA entrega é criada.

-- ==========================================================
-- == FIM: COMPLEMENTO
-- ==========================================================

-- ========= INSERÇÃO DE ANEXOS PARA TODAS AS ENTREGAS =========
INSERT INTO anexo ("titulo", "conteudo_texto", "data_upload", "id_entrega", "id_publicacao_mural") VALUES
('entrega_1.txt', pg_read_file('/var/lib/postgresql/data/teste.txt'), '2025-09-28 10:00:00', 1, NULL),
('entrega_2.txt', pg_read_file('/var/lib/postgresql/data/teste.txt'), '2025-09-29 15:30:00', 2, NULL),
-- ('entrega_3.txt', pg_read_file('/var/lib/postgresql/data/teste.txt'), '2025-10-29 20:00:00', 3, NULL),
('entrega_4.txt', pg_read_file('/var/lib/postgresql/data/teste.txt'), '2025-11-20 10:00:00', 4, NULL);
-- ('entrega_5.txt', pg_read_file('/var/lib/postgresql/data/teste.txt'), '2025-10-19 09:00:00', 5, NULL),
-- ('entrega_6.txt', pg_read_file('/var/lib/postgresql/data/teste.txt'), '2025-10-20 11:30:00', 6, NULL);

-- ========= CONFIGURAÇÕES E ATUALIZAÇÃO DE SEQUENCES =========

-- Reinicia as sequências para evitar conflitos futuros
ALTER SEQUENCE atividade_id_seq RESTART WITH 100;
ALTER SEQUENCE item_atividade_id_seq RESTART WITH 100;
ALTER SEQUENCE criterio_id_seq RESTART WITH 100;
ALTER SEQUENCE publicacao_mural_id_seq RESTART WITH 100;
ALTER SEQUENCE comentario_id_seq RESTART WITH 100;
ALTER SEQUENCE entrega_id_seq RESTART WITH 100;
ALTER SEQUENCE realizar_avaliacao_id_seq RESTART WITH 100;
ALTER SEQUENCE avaliacao_criterio_id_seq RESTART WITH 100;
ALTER SEQUENCE grupo_de_alunos_id_seq RESTART WITH 100;
ALTER SEQUENCE integrante_grupo_de_alunos_id_seq RESTART WITH 100;
ALTER SEQUENCE formacao_grupo_id_seq RESTART WITH 100;

-- Configurações gerais do sistema
INSERT INTO config("chave", "valor") VALUES ('MAX_ETAPAS_POR_ATIVIDADE', '5');
