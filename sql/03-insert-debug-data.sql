INSERT INTO usuario("id", "nome", "login", "hash", "salt", "bio", "email", "acumulo_xp", "nivel", "matricula_aluno", "dt_nasc", "data_criacao", "ultimo_acesso", "cor", "id_instituicao") VALUES(1, 'Vinícius Pessoa', 'ViniPessoa8', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Sou estudante de SI :)', 'vcbp.snf18@uea.edu.br', 0, 0, '1811440260', '1999-12-06', '2024-09-10', '2024-09-10T23:51:53.764Z', 'D7854F', 1);
INSERT INTO usuario("id", "nome", "login", "hash", "salt", "bio", "email", "acumulo_xp", "nivel", "matricula_aluno", "dt_nasc", "data_criacao", "ultimo_acesso", "cor", "id_instituicao") VALUES
(2, 'Ana Souza', 'AnaS10', '$2a$10$XyZABCD12345KJHsdUqPObFlh123Ghv67YPLOpWZXQ', '$2a$10$XyZABCD12345KJHsdUqPO', 'Apaixonada por tecnologia e educação.', 'ana.souza@email.com', 150, 2, '1811440261', '2001-05-15', '2024-09-11', '2024-09-11T10:25:30.123Z', '6c943d', 1),
(3, 'Carlos Oliveira', 'Carlos_Oliveira', '$2a$10$MNOPQRST9876543JHKLZXVBNMP', '$2a$10$MNOPQRST9876543JHKLZX', 'Entusiasta de IA e jogos.', 'carlos.oliveira@email.com', 320, 3, '1811440262', '1998-07-22', '2024-09-12', '2024-09-12T14:12:45.567Z', 'C75B5B', 1),
(4, 'Mariana Lima', 'MariLima99', '$2a$10$UVWXYZ87654321LMNOPQRSTJHKL', '$2a$10$UVWXYZ87654321LMNO', 'Amante de dados e estatística.', 'mariana.lima@email.com', 200, 2, '1811440263', '2000-02-08', '2024-09-13', '2024-09-13T08:45:20.789Z', '6A4CA3', 1),
(5, 'Felipe Martins', 'FelipeM', '$2a$10$ASDFGHJKLQWERTYUIOPZXCVBNM', '$2a$10$ASDFGHJKLQWERTYUIO', 'Desenvolvedor full-stack.', 'felipe.martins@email.com', 500, 4, '1811440264', '1997-10-30', '2024-09-14', '2024-09-14T19:05:10.234Z', 'D7854F', 1),
(6, 'Julia Ribeiro', 'Julia_R', '$2a$10$QAZWSXEDCRFV123456TGBYHN', '$2a$10$QAZWSXEDCRFV12345', 'Curiosa sobre ciência de dados.', 'julia.ribeiro@email.com', 100, 1, '1811440265', '2002-11-18', '2024-09-15', '2024-09-15T16:33:25.432Z', '2E5D89', 1),
(7, 'Ana Clara Souza', 'AnaSouza12', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Estudante de Direito apaixonada por filosofia!', 'ana.souza@uea.edu.br', 50, 1, '1811440261', '1998-05-15', '2024-09-11', '2024-09-11T09:00:00.000Z', '5B7F34', 1),
(8, 'Carlos Alberto Silva', 'CarlosSilva34', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Amo programação e tecnologia.', 'carlos.silva@uea.edu.br', 120, 2, '1811440262', '2000-01-20', '2024-09-11', '2024-09-11T09:30:00.000Z', 'AD4D4D', 1),
(9, 'Júlia Martins', 'JuliaMartins77', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Estudante de Biologia e amante da natureza!', 'julia.martins@uea.edu.br', 80, 1, '1811440263', '2001-02-28', '2024-09-11', '2024-09-11T10:00:00.000Z', '7D63C2', 1),
(10, 'Felipe Souza Lima', 'FelipeSouza44', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Curioso sobre tudo e estudante de Física.', 'felipe.souza@uea.edu.br', 150, 3, '1811440264', '1997-08-10', '2024-09-11', '2024-09-11T10:30:00.000Z', 'E09560',1),
(11, 'Mariana Gomes', 'MariGomes10', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Estudante de Psicologia, sempre em busca de autoconhecimento.', 'mariana.gomes@uea.edu.br', 30, 1, '1811440265', '1999-11-25', '2024-09-11', '2024-09-11T11:00:00.000Z', '789BC0',1);

ALTER SEQUENCE usuario_id_seq RESTART WITH 12;
-- ALTER SEQUENCE usuario_id_seq OWNED BY usuario.id;

INSERT INTO turma("id", "codigo", "cor", "disciplina", "nome", "ano", "periodo", "descricao", "local", "numero_alunos", "id_instituicao", "id_professor") VALUES
(1, 'COD-TESTE-01', '4682B4', 'Matéria_teste', 'Nome_Teste', 2024, 1, 'descricao da turma', 'sala A24', 0, 1, 1), 
(2, 'COD-TESTE-02', '6B8E23', 'Essa matéria é boa', 'Essa turma é boa', 2024, 2, 'descricao da turma 2', 'sala A25', 0, 1, 1),
(3, 'COD-TESTE-03', 'CD5C5C', 'A melhor de todas', 'A turma mais daora', 2024, 2, 'descricao da turma 3', 'sala A26', 0, 1, 1);
-- ALTER SEQUENCE usuario_id_seq OWNED BY turma.id;
ALTER SEQUENCE turma_id_seq RESTART WITH 4;

INSERT INTO estudante("id", "matricula", "data_criacao", "acumulo_xp", "nivel", "id_usuario") VALUES
(1, '20240002', '2024-09-10 12:05:00', 250, 5, 2),
(2, '20240003', '2024-09-10 12:10:00', 50, 1, 3),
(3, '20240004', '2024-09-10 12:15:00', 500, 7, 4),
(4, '20240005', '2024-09-10 12:20:00', 0, 0, 5),
(5, '20240006', '2024-09-10 12:25:00', 0, 0, 6),
(6, '20240007', '2024-09-11 09:00:00', 50, 1, 7),
(7, '20240008', '2024-09-11 09:30:00', 120, 2, 8),
(8, '20240009', '2024-09-11 10:00:00', 80, 1, 9),
(9, '20240010', '2024-09-11 10:30:00', 150, 3, 10),
(10, '20240011', '2024-09-11 11:00:00', 30, 1, 11);
ALTER SEQUENCE estudante_id_seq RESTART WITH 11;

INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(1, 1, 1, 100);
INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(2, 2, 1, 240);
INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(3, 3, 1, 130);
INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(4, 4, 1, 20);
INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(5, 5, 1, 300);
INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(6, 6, 1, 180);
INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(7, 7, 1, 210);
INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(8, 8, 1, 80);
INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(9, 9, 1, 100);
INSERT INTO estudante_turma("id", "id_estudante", "id_turma", "pontos") VALUES(10, 10, 1, 120);
ALTER SEQUENCE estudante_turma_id_seq RESTART WITH 6;

INSERT INTO atividade("id", "titulo", "descricao", "prazo", "id_turma") VALUES(1, 'Atividade Exemplo 1', 'Atividade de exemplo.', '2025-03-01T00:00:00.000Z', 1);
INSERT INTO atividade("id", "titulo", "descricao", "prazo", "id_turma") VALUES(2, 'Atividade Exemplo 2', 'Atividade de exemplo.', '2025-06-01T00:00:00.000Z', 1);
ALTER SEQUENCE atividade_id_seq RESTART WITH 3;

INSERT INTO item_atividade("id", "titulo", "descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "em_grupos", "receber_apos_prazo", "n_integrantes_grupo", "n_max_grupos", "status", "id_atividade") VALUES(1, 'Etapa Exemplo 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi ipsum, pulvinar vel felis at, finibus malesuada erat. Proin nulla neque, pretium eget purus quis, dapibus aliquet ex. Proin porta vitae lacus ut varius. Nam tincidunt accumsan aliquet. Donec eu nunc imperdiet, sollicitudin ante in, finibus ligula. Mauris et erat sed arcu faucibus vestibulum. Vivamus metus ex, bibendum nec elit at, rutrum porta magna. Duis dapibus ligula ut libero viverra porta. Praesent mi risus, imperdiet sit amet molestie at, fringilla eget dolor. Quisque eu finibus turpis.', 4, '2025-01-20T20:00:00.000Z', '2025-01-30T20:00:00.000Z', 1, false, false, 0, 0, 1, 1);
INSERT INTO item_atividade("id", "titulo","descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "em_grupos", "receber_apos_prazo", "n_integrantes_grupo", "n_max_grupos", "status", "id_atividade") VALUES(2, 'Etapa Exemplo 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi ipsum, pulvinar vel felis at, finibus malesuada erat. Proin nulla neque, pretium eget purus quis, dapibus aliquet ex. Proin porta vitae lacus ut varius. Nam tincidunt accumsan aliquet. Donec eu nunc imperdiet, sollicitudin ante in, finibus ligula. Mauris et erat sed arcu faucibus vestibulum. Vivamus metus ex, bibendum nec elit at, rutrum porta magna. Duis dapibus ligula ut libero viverra porta. Praesent mi risus, imperdiet sit amet molestie at, fringilla eget dolor. Quisque eu finibus turpis.', 4, '2025-02-20T20:00:00.000Z', '2025-02-28T20:00:00.000Z', 1, false, false, 0, 0, 2, 1);
INSERT INTO item_atividade("id", "titulo","descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "em_grupos", "receber_apos_prazo", "n_integrantes_grupo", "n_max_grupos", "status", "id_atividade") VALUES(3, 'Etapa Exemplo 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi ipsum, pulvinar vel felis at, finibus malesuada erat. Proin nulla neque, pretium eget purus quis, dapibus aliquet ex. Proin porta vitae lacus ut varius. Nam tincidunt accumsan aliquet. Donec eu nunc imperdiet, sollicitudin ante in, finibus ligula. Mauris et erat sed arcu faucibus vestibulum. Vivamus metus ex, bibendum nec elit at, rutrum porta magna. Duis dapibus ligula ut libero viverra porta. Praesent mi risus, imperdiet sit amet molestie at, fringilla eget dolor. Quisque eu finibus turpis.', 4, '2025-03-20T20:00:00.000Z', '2025-03-28T20:00:00.000Z', 1, false, false, 0, 0, 3, 1);
INSERT INTO item_atividade("id", "titulo","descricao", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "em_grupos", "receber_apos_prazo", "n_integrantes_grupo", "n_max_grupos", "status", "id_atividade") VALUES(4, 'Etapa Exemplo 4','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi ipsum, pulvinar vel felis at, finibus malesuada erat. Proin nulla neque, pretium eget purus quis, dapibus aliquet ex. Proin porta vitae lacus ut varius. Nam tincidunt accumsan aliquet. Donec eu nunc imperdiet, sollicitudin ante in, finibus ligula. Mauris et erat sed arcu faucibus vestibulum. Vivamus metus ex, bibendum nec elit at, rutrum porta magna. Duis dapibus ligula ut libero viverra porta. Praesent mi risus, imperdiet sit amet molestie at, fringilla eget dolor. Quisque eu finibus turpis.', 4, '2025-04-20T20:00:00.000Z', '2025-04-28T20:00:00.000Z', 1, false, false, 0, 0, 4, 1);
ALTER SEQUENCE item_atividade_id_seq RESTART WITH 5;

INSERT INTO entrega ("data_entrega", "id_grupo_de_alunos", "id_estudante", "id_item_atividade") 
VALUES 
('2024-03-01 14:30:00', NULL, 1, 1),
('2024-03-02 10:15:00', NULL, 3, 1),
('2024-03-03 18:45:00', NULL, 5, 1),
('2024-03-04 09:00:00', NULL, 9, 1),
('2024-03-05 16:20:00', NULL, 10, 1);
ALTER SEQUENCE entrega_id_seq RESTART WITH 6;

INSERT INTO publicacao_mural ("id", "conteudo", "data_publicacao", "id_turma", "id_usuario") 
VALUES 
(1, 'Alguém sem grupo pro trabalho?', (CURRENT_DATE - INTERVAL '5 days') + TIME '08:00:00',1, 4),
(2, 'Sem aula hoje, turma', (CURRENT_DATE - INTERVAL '10 days') + TIME '23:30:00', 1, 1);
ALTER SEQUENCE publicacao_mural_id_seq RESTART WITH 3;

INSERT INTO anexo ("titulo", "conteudo_texto", "data_upload", "id_entrega", "id_publicacao_mural") 
VALUES ('teste.txt', pg_read_file('/var/lib/postgresql/data/teste.txt'), '2024-03-01 14:30:00', 4, null);
ALTER SEQUENCE anexo_id_seq RESTART WITH 2;

INSERT INTO comentario ("texto", "id_entrega", "id_usuario", "id_publicacao_mural", "data_criacao") 
VALUES 
('Prof, meu cachorro comeu meu dever', 3, 6, null, (CURRENT_DATE - INTERVAL '5 days') + TIME '08:00:00'),
('te vira', 3, 1, null, (CURRENT_DATE - INTERVAL '4 days') + TIME '08:00:00'),
('eu :)', null, 6, 1, (CURRENT_DATE - INTERVAL '5 days') + TIME '08:10:00'),
('eu também', null, 7, 1, (CURRENT_DATE - INTERVAL '5 days') + TIME '08:13:00'),
('então fechou', null, 4, 1, (CURRENT_DATE - INTERVAL '5 days') + TIME '08:20:00');
ALTER SEQUENCE comentario_id_seq RESTART WITH 6;

INSERT INTO criterio ("titulo", "descricao", "pontuacao_max", "peso", "id_item_atividade") 
VALUES 
('Critério 1', 'Descrição do critério 1', 5, 1, 1),
('Critério 2', 'Descrição do critério 2', 5, 1, 1);
ALTER SEQUENCE criterio_id_seq RESTART WITH 3;

