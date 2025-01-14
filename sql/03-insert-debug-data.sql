INSERT INTO usuario("id", "nome", "login", "hash", "salt", "bio", "email", "acumulo_xp", "nivel", "matricula_aluno", "dt_nasc", "data_criacao", "ultimo_acesso", "id_instituicao") VALUES(1, 'Vinícius Pessoa', 'ViniPessoa8', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Sou estudante de SI :)', 'vcbp.snf18@uea.edu.br', 0, 0, '1811440260', '1999-12-06', '2024-09-10', '2024-09-10T23:51:53.764Z', 1);
ALTER SEQUENCE usuario_id_seq RESTART WITH 2;
-- ALTER SEQUENCE usuario_id_seq OWNED BY usuario.id;

INSERT INTO turma("id", "codigo", "cor", "disciplina", "nome", "ano", "periodo", "descricao", "local", "numero_alunos", "id_instituicao", "id_professor") VALUES(1, 'COD-TESTE-01', '4682B4', 'Matéria_teste', 'Nome_Teste', 2024, 1, 'descricao da turma', 'sala A24', 0, 1, 1);
INSERT INTO turma("id", "codigo", "cor", "disciplina", "nome", "ano", "periodo", "descricao", "local", "numero_alunos", "id_instituicao", "id_professor") VALUES(2, 'COD-TESTE-02', '6B8E23', 'Essa matéria é boa', 'Essa turma é boa', 2024, 2, 'descricao da turma 2', 'sala A25', 0, 1, 1);
INSERT INTO turma("id", "codigo", "cor", "disciplina", "nome", "ano", "periodo", "descricao", "local", "numero_alunos", "id_instituicao", "id_professor") VALUES(3, 'COD-TESTE-03', 'CD5C5C', 'A melhor de todas', 'A turma mais daora', 2024, 2, 'descricao da turma 3', 'sala A26', 0, 1, 1);
-- ALTER SEQUENCE usuario_id_seq OWNED BY turma.id;
ALTER SEQUENCE turma_id_seq RESTART WITH 4;

INSERT INTO atividade("id", "titulo", "descricao", "prazo", "id_turma") VALUES(1, 'Atividade Exemplo 1', 'Atividade de exemplo.', '2025-03-01T00:00:00.000Z', 1);
INSERT INTO atividade("id", "titulo", "descricao", "prazo", "id_turma") VALUES(2, 'Atividade Exemplo 2', 'Atividade de exemplo.', '2025-06-01T00:00:00.000Z', 1);
ALTER SEQUENCE atividade_id_seq RESTART WITH 3;

INSERT INTO item_atividade("id", "titulo", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "em_grupos", "receber_apos_prazo", "n_integrantes_grupo", "n_max_grupos", "status", "id_atividade_pai") VALUES(1, 'Etapa Exemplo 1', 4, '2025-01-20T20:00:00.000Z', '2025-01-30T20:00:00.000Z', 1, false, false, 0, 0, 1, 1);
INSERT INTO item_atividade("id", "titulo", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "em_grupos", "receber_apos_prazo", "n_integrantes_grupo", "n_max_grupos", "status", "id_atividade_pai") VALUES(2, 'Etapa Exemplo 2', 4, '2025-02-20T20:00:00.000Z', '2025-02-28T20:00:00.000Z', 1, false, false, 0, 0, 2, 1);
INSERT INTO item_atividade("id", "titulo", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "em_grupos", "receber_apos_prazo", "n_integrantes_grupo", "n_max_grupos", "status", "id_atividade_pai") VALUES(3, 'Etapa Exemplo 3', 4, '2025-03-20T20:00:00.000Z', '2025-03-28T20:00:00.000Z', 1, false, false, 0, 0, 3, 1);
INSERT INTO item_atividade("id", "titulo", "nota_max", "data_entrega_inicial", "data_entrega_final", "tipo_atribuicao_nota", "em_grupos", "receber_apos_prazo", "n_integrantes_grupo", "n_max_grupos", "status", "id_atividade_pai") VALUES(4, 'Etapa Exemplo 4', 4, '2025-04-20T20:00:00.000Z', '2025-04-28T20:00:00.000Z', 1, false, false, 0, 0, 4, 1);
ALTER SEQUENCE item_atividade_id_seq RESTART WITH 5;
