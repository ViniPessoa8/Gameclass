INSERT INTO usuario("id", "nome", "login", "hash", "salt", "bio", "email", "acumulo_xp", "nivel", "matricula_aluno", "dt_nasc", "data_criacao", "ultimo_acesso", "id_instituicao") VALUES(1, 'Vinícius Pessoa', 'ViniPessoa8', '$2a$10$8K.0ETBQRhu41sbIssQFsOhhtugGsb1f8ln5PlJBdbxHp/42OWtb2', '$2a$10$8K.0ETBQRhu41sbIssQFsO', 'Sou estudante de SI :)', 'vcbp.snf18@uea.edu.br', 0, 0, '1811440260', '1999-12-06', '2024-09-10', '2024-09-10T23:51:53.764Z', 1);
ALTER SEQUENCE usuario_id_seq RESTART WITH 1;
-- ALTER SEQUENCE usuario_id_seq OWNED BY usuario.id;

INSERT INTO turma("id", "codigo", "cor", "disciplina", "nome", "ano", "periodo", "descricao", "local", "numero_alunos", "id_instituicao", "id_professor") VALUES(1, 'COD-TESTE-01', '442200', 'Matéria_teste', 'Nome_Teste', 2024, 1, 'descricao da turma', 'sala A24', 0, 1, 1);
INSERT INTO turma("id", "codigo", "cor", "disciplina", "nome", "ano", "periodo", "descricao", "local", "numero_alunos", "id_instituicao", "id_professor") VALUES(2, 'COD-TESTE-02', '666999', 'Essa matéria é boa', 'Essa turma é boa', 2024, 2, 'descricao da turma 2', 'sala A25', 0, 1, 1);
INSERT INTO turma("id", "codigo", "cor", "disciplina", "nome", "ano", "periodo", "descricao", "local", "numero_alunos", "id_instituicao", "id_professor") VALUES(3, 'COD-TESTE-03', '420420', 'A melhor de todas', 'A turma mais daora', 2024, 2, 'descricao da turma 3', 'sala A26', 0, 1, 1);
-- ALTER SEQUENCE usuario_id_seq OWNED BY turma.id;
ALTER SEQUENCE turma_id_seq RESTART WITH 3;
