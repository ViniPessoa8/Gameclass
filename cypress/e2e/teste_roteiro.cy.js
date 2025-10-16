it('Cadastro', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#btnCadastro').should("be.visible");
	cy.get('#btnCadastro').click();
	cy.wait(500)
	cy.get(':nth-child(1) > .unboard > .unborded').clear('T');
	cy.get(':nth-child(1) > .unboard > .unborded').type('Teste');
	cy.get('.card-container > :nth-child(2)').click();
	cy.get(':nth-child(2) > .unboard > .unborded').clear('te');
	cy.get(':nth-child(2) > .unboard > .unborded').type('teste@teste.com');
	cy.get(':nth-child(3) > .unboard > .unborded').clear('T');
	cy.get(':nth-child(3) > .unboard > .unborded').type('Teste');
	cy.get(':nth-child(4) > .input').clear('S');
	cy.get(':nth-child(4) > .input').type('Senhavalida!1');
	cy.get('.card-container > :nth-child(5)').click();
	cy.get(':nth-child(5) > .input').clear('S');
	cy.get(':nth-child(5) > .input').type('Senhavalida!1');
	cy.get('#inputDtInicioEtapa').type("2025-10-08T16:37");
	cy.get('.container > .s-gl8iGQs72fud').click();
	cy.get('.button').click();
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('Teste');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('.s-5xw9RGpuDz7F').click();
	cy.get('.button-professor > div.s-76bjOAAZraKf > .icon').click();
	cy.get('.buttons > :nth-child(2)').click();
});

it('Criação de Turma, Atividade e Etapa', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get('.sidebar > .button').click();
	cy.wait(500)
	cy.get('#inputCodigo').clear('0');
	cy.get('#inputCodigo').type('0001');
	cy.get(':nth-child(2) > div.s-vsi8GcpSRwtX > .board > .borded').clear('M');
	cy.get(':nth-child(2) > div.s-vsi8GcpSRwtX > .board > .borded').type('Matemática');
	cy.get(':nth-child(3) > div.s-vsi8GcpSRwtX > .board > .borded').clear('O');
	cy.get(':nth-child(3) > div.s-vsi8GcpSRwtX > .board > .borded').type('Os Matemáticos 2025');
	cy.get(':nth-child(4) > div.s-vsi8GcpSRwtX > .board > .borded').clear('t');
	cy.get(':nth-child(4) > div.s-vsi8GcpSRwtX > .board > .borded').type('turma de matemática');
	cy.get(':nth-child(5) > div.s-vsi8GcpSRwtX > .board > .borded').clear('A');
	cy.get(':nth-child(5) > div.s-vsi8GcpSRwtX > .board > .borded').type('A24');
	cy.get('.select-container > .s-7u07kVIZQDQm').click();
	cy.get('.options-container > .option').click();
	cy.get('[style="align-self: center;"] > .button').click();
	cy.get(':nth-child(3) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get('#btnCriarAtividade').click();
	cy.get('#inputTitulo').clear('A');
	cy.get('#inputTitulo').type('Atividade Nova 1');
	cy.get('#inputDescricao').clear();
	cy.get('#inputDescricao').type('Descrição da Atividade Nova 1');
	cy.get('#inputPrazo').type('2026-01-01T00:00');
	cy.get(':nth-child(7) > .button').click();
	cy.get('#inputTituloEtapa').clear('T');
	cy.get('#inputTituloEtapa').type('Título da Etapa 1');
	cy.get('#inputDtFimEtapa').click();
	cy.get('#inputDtFimEtapa').type('2026-01-01T00:00');
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 1');
	cy.get('#inputNotaMaxCriterio').clear('8');
	cy.get('#inputNotaMaxCriterio').type('8');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 1');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 2');
	cy.get('#inputNotaMaxCriterio').clear('2');
	cy.get('#inputNotaMaxCriterio').type('2');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 2');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('[type="submit"]').click();
});


it('Criação de Atividade e Etapa em turma já existente', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	/* ==== Generated with Cypress Studio ==== */
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get('#btnCriarAtividade').click();
	cy.get('#inputTitulo').clear('A');
	cy.get('#inputTitulo').type('Atividade em turma que já existia');
	cy.get('#inputDescricao').clear('A');
	cy.get('#inputDescricao').type('Atividade em turma que já existia');
	cy.get('#inputPrazo').type('2026-01-01T00:00');
	cy.get(':nth-child(7) > .button').click();
	/* ==== End Cypress Studio ==== */
	cy.get('#inputTituloEtapa').clear('T');
	cy.get('#inputTituloEtapa').type('Título da Etapa 1');
	cy.get('#inputDtFimEtapa').click();
	cy.get('#inputDtFimEtapa').type('2026-01-01T00:00');
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 1');
	cy.get('#inputNotaMaxCriterio').clear('8');
	cy.get('#inputNotaMaxCriterio').type('8');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 1');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 2');
	cy.get('#inputNotaMaxCriterio').clear('2');
	cy.get('#inputNotaMaxCriterio').type('2');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 2');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('[type="submit"]').click();
});

it('Criação de Etapa em Atividade já existente', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	/* ==== Generated with Cypress Studio ==== */
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content').click();
	cy.get('.button.s-o83GZyLGIZKf > .button').click();
	/* ==== End Cypress Studio ==== */
	cy.get('#inputTituloEtapa').clear('T');
	cy.get('#inputTituloEtapa').type('Título da Etapa 1');
	cy.get('#inputDtFimEtapa').click();
	cy.get('#inputDtFimEtapa').type('2025-10-31T00:00');
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 1');
	cy.get('#inputNotaMaxCriterio').clear('8');
	cy.get('#inputNotaMaxCriterio').type('8');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 1');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 2');
	cy.get('#inputNotaMaxCriterio').clear('2');
	cy.get('#inputNotaMaxCriterio').type('2');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 2');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('[type="submit"]').click();
});

it('Criação de Etapa em Atividade já existente, importando critérios', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content').click();
	cy.get('.button.s-o83GZyLGIZKf > .button').click();
	cy.get('#inputTituloEtapa').clear('T');
	cy.get('#inputTituloEtapa').type('Título da Etapa 1');
	cy.get('#inputDtFimEtapa').click();
	cy.get('#inputDtFimEtapa').type('2025-10-31T00:00');
	cy.get('.criterios-container > :nth-child(2) > :nth-child(1) > .button').click();
	cy.get(':nth-child(1) > .criterio-item > input.s-Y9tK9IyKteCv').check();
	cy.get(':nth-child(2) > .criterio-item > input.s-Y9tK9IyKteCv').check();
	cy.get('.modal-footer > [type=""]').click();
	cy.get('[type="submit"]').click();
});

it('Criação de Etapa com Média Ponderada', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	/* ==== Generated with Cypress Studio ==== */
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content').click();
	cy.get('.button.s-o83GZyLGIZKf > .button').click();
	/* ==== End Cypress Studio ==== */
	// cy.get('#media_ponderada').click();
	cy.get(':nth-child(2) > #inputAtribuicaoNotasEtapa').click()
	cy.get('#btn-0').click();
	cy.get('#inputTituloEtapa').clear('T');
	cy.get('#inputTituloEtapa').type('Título da Etapa com Média Ponderada');
	cy.get('#inputDtFimEtapa').click();
	cy.get('#inputDtFimEtapa').type('2025-10-31T00:00');
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 1');
	cy.get('#inputNotaMaxCriterio').clear('8');
	cy.get('#inputNotaMaxCriterio').type('8');
	cy.get('#inputPesoCriterio').clear('2');
	cy.get('#inputPesoCriterio').type('2');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 1');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 2');
	cy.get('#inputNotaMaxCriterio').clear('2');
	cy.get('#inputNotaMaxCriterio').type('2');
	cy.get('#inputPesoCriterio').clear('2');
	cy.get('#inputPesoCriterio').type('3');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 2');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('[type="submit"]').click();
});


it('Criação de Etapa Em Grupos, com os alunos formando seus grupos', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content').click();
	cy.get('.button.s-o83GZyLGIZKf > .button').click();
	cy.get('#inputTituloEtapa').clear('T');
	cy.get('#inputTituloEtapa').type('Título da Etapa em Grupos 1');
	cy.get('#inputDtFimEtapa').click();
	cy.get('#inputDtFimEtapa').type('2025-10-31T00:00');
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 1');
	cy.get('#inputNotaMaxCriterio').clear('8');
	cy.get('#inputNotaMaxCriterio').type('8');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 1');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 2');
	cy.get('#inputNotaMaxCriterio').clear('2');
	cy.get('#inputNotaMaxCriterio').type('2');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 2');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('#realizacao_grupos').click();
	cy.get('#inputNGruposEtapa0').type("4");
	cy.get('#inputNAluno0').type("4")
	cy.get('[type="submit"]').click();
});

it('Criação de Etapa Em Grupos, com o professor formando os grupos', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content').click();
	cy.get('.button.s-o83GZyLGIZKf > .button').click();
	cy.get('#inputTituloEtapa').clear('T');
	cy.get('#inputTituloEtapa').type('Título da Etapa em Grupos 2');
	cy.get('#inputDtFimEtapa').click();
	cy.get('#inputDtFimEtapa').type('2025-10-31T00:00');
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 1');
	cy.get('#inputNotaMaxCriterio').clear('8');
	cy.get('#inputNotaMaxCriterio').type('8');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 1');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('#inputTituloCriterio').clear('T');
	cy.get('#inputTituloCriterio').type('Título do Critério 2');
	cy.get('#inputNotaMaxCriterio').clear('2');
	cy.get('#inputNotaMaxCriterio').type('2');
	cy.get('#inputDescricaoCriterio').clear('D');
	cy.get('#inputDescricaoCriterio').type('Descrição do Critério 2');
	cy.get('.btn-add-criterio > .button').click();
	cy.get('#realizacao_grupos').click();
	cy.get('#inputNGruposEtapa0').type("3");
	cy.get('#inputNAluno0').type("2")
	cy.get(':nth-child(2) > #formacaoGrupos').click()
	cy.get('[type="submit"]').click();
	cy.get(':nth-child(1) > .search-container > .search-input').click();
	cy.get('#estudante-0').click();
	cy.get(':nth-child(1) > .search-container > .search-input').click();
	cy.get('#estudante-0').click();
	cy.get(':nth-child(2) > .search-container > .search-input').click();
	cy.get('#estudante-0').click();
	cy.get(':nth-child(2) > .search-container > .search-input').click();
	cy.get('#estudante-0').click();
	cy.get(':nth-child(3) > .search-container > .search-input').click();
	cy.get('#estudante-0').click();
	cy.get('.button-definir > .button').click();
});

it('Avaliação de uma etapa individual', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(1) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(4) > .atividade-info > .atividade-info-content > :nth-child(2) > .titulo').click();
	cy.get('[href="atividades/8/9"] > .button').click();
	cy.get(':nth-child(1) > .botao').click();
	cy.get('.btn-avaliar > .button').click();
	cy.get(':nth-child(3) > .input-container > .board > #inputNotaMaxCriterio').click();
	cy.get(':nth-child(3) > .input-container > .board > #inputNotaMaxCriterio').clear('4');
	cy.get(':nth-child(3) > .input-container > .board > #inputNotaMaxCriterio').type('4');
	cy.get(':nth-child(4) > .input-container > .board > #inputNotaMaxCriterio').click();
	cy.get(':nth-child(4) > .input-container > .board > #inputNotaMaxCriterio').clear('5');
	cy.get(':nth-child(4) > .input-container > .board > #inputNotaMaxCriterio').type('5');
	cy.get('.pontuacao-final').click();
	cy.get('.btn-finalizar > .button').click();
	cy.get('.status-resposta').should("be.visible");
	cy.get('.status-resposta').should("have.text", "(Avaliado)");
	cy.get('[data-content=""] > div').should("be.visible")
	cy.get('[data-content=""] > div').should("have.text", "Avaliação realizada com sucesso!")
});

it('Avaliação de uma etapa em grupos', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content > :nth-child(2) > .titulo').click();
	cy.get('[href="atividades/4/4"] > .button > .feather').click();
	cy.get('.botao').click();
	cy.get('.btn-avaliar > .button').click();
	cy.get(':nth-child(1) > .info-container > p.s-BkPa3DTopvmz > .s-BkPa3DTopvmz').click();
	cy.get(':nth-child(3) > .input-container > .board > .borded').clear('4');
	cy.get(':nth-child(3) > .input-container > .board > .borded').type('4');
	cy.get(':nth-child(4) > .input-container > .board > .borded').clear('3');
	cy.get(':nth-child(4) > .input-container > .board > .borded').type('3');
	cy.get('.criterios-grid').click();
	cy.get('#avaliar').click();

	// Asserts
	cy.get('.corrigido').should("be.visible")
	cy.get('.corrigido').should("have.css", "background-color", "rgb(0, 128, 0)")
});

it('Avaliação de uma etapa em grupos, replicando a nota para todos os alunos', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content > :nth-child(2) > .titulo').click();
	cy.get('[href="atividades/4/4"] > .button > .feather').click();
	cy.get('.botao').click();
	cy.get('.btn-avaliar > .button').click();
	cy.get(':nth-child(1) > .info-container > p.s-BkPa3DTopvmz > .s-BkPa3DTopvmz').click();
	cy.get(':nth-child(3) > .input-container > .board > .borded').clear('4');
	cy.get(':nth-child(3) > .input-container > .board > .borded').type('4');
	cy.get(':nth-child(4) > .input-container > .board > .borded').clear('3');
	cy.get(':nth-child(4) > .input-container > .board > .borded').type('3');
	cy.get('.criterios-grid').click();
	cy.get('#aplicarParaTodaEquipe').click();
	cy.get('#btn-0').click()

	// Asserts
	cy.get('.corrigido').should("be.visible")
	cy.get('.corrigido').should("have.css", "background-color", "rgb(0, 128, 0)")
	cy.get('[data-content=""] > div').should("have.text", "Avaliação realizada com sucesso!")
});

it('Editar atividade', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content > :nth-child(2) > .titulo').click();
	cy.get('.right > .botoes > a.s-XaskQ3CjU9PJ > .button').click();
	cy.get('#inputTitulo').clear('Metodologias Ágeis');
	cy.get('#inputTitulo').type('Atividade Editada!');
	cy.get('#inputDescricao').type("Descrição da atividade editada");
	cy.get(':nth-child(6) > .button').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content > :nth-child(2) > .titulo').should("have.text", "Atividade Editada!")
});

it('Editar etapa', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content > :nth-child(2) > .titulo').click();
	cy.get('[href="atividades/4/4/edit"] > .button > .feather').click();
	cy.get('#inputTituloEtapa').click();
	cy.get('#inputTituloEtapa').clear('Simulação de Sprint (Scrum)');
	cy.get('#inputTituloEtapa').type('Etapa Editada!');
	cy.get('[type="submit"]').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content').click();
	cy.get(':nth-child(2) > [data-layer="Content"]').should("have.text", "Etapa Editada!")
});


it('Editar nota de um aluno do grupo', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(3) > .atividade-info > .atividade-info-content > :nth-child(2) > .titulo').click();
	cy.get('[href="atividades/4/4"] > .button > .feather').click();
	cy.get('.botao').click();
	cy.get('.btn-avaliar > .button').click();
	cy.get(':nth-child(1) > .info-container > p.s-BkPa3DTopvmz > .s-BkPa3DTopvmz').click();
	cy.get(':nth-child(3) > .input-container > .board > .borded').clear('4');
	cy.get(':nth-child(3) > .input-container > .board > .borded').type('2');
	cy.get(':nth-child(4) > .input-container > .board > .borded').clear('4');
	cy.get(':nth-child(4) > .input-container > .board > .borded').type('2');
	cy.get('.criterios-grid').click();
	cy.get('#avaliar').click();

	// Asserts
	cy.get('.corrigido').should("be.visible")
	cy.get('.corrigido').should("have.css", "background-color", "rgb(0, 128, 0)")
	cy.get(':nth-child(1) > .info-container > :nth-child(2)').should("have.text", "Média: 2.0")
});

it('Consultar o relatório da turma', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get(':nth-child(4) > .tab-content > h2.s-w-OmsN2Ckuj4').click();
	cy.get(':nth-child(1) > .titulo-atividade > img.s-Xn_-580q0QQ_').click();
	cy.get('h1.s-Xn_-580q0QQ_').should("be.visible");
	cy.get('h1.s-Xn_-580q0QQ_').should("have.text", "Relatório da turma");
});

it('Visualizar perfil de um aluno pelo ranking', () => {
	let nomeEstudante;
	let nomeEstudantePopup;
	let nomeEstudantePerfil;

	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();

	cy.get('.top-3 > :nth-child(1) > .info-container ').click();
	cy.get('.top-3 > :nth-child(1) > .info-container ').invoke("text").then((text) => {
		nomeEstudante = text.split(" ").slice(0, -2).join(" ");
		cy.log("Texto extraido para o nome do estudante: ", nomeEstudante);
	});

	cy.get('h2.s-ZCAoyxXgg3zn').invoke("text").then((text) => {
		nomeEstudantePopup = text;
		cy.log("Texto extraido para o nome do estudante (Popup): ", nomeEstudantePopup);
	});

	cy.get('.profile-button').click();

	cy.get('.estudante-nome-login > h3.s-miw6V-QuaajW').invoke("text").then((text) => {
		nomeEstudantePerfil = text;
		cy.log("Texto extraido para o nome do estudante (Perfil): ", nomeEstudantePerfil);
	});

	cy.then(() => {
		expect(nomeEstudantePopup).to.contains(nomeEstudante)
		expect(nomeEstudantePerfil).to.contains(nomeEstudante)
	})
});

it('Visualizar perfil de um aluno pela tela de membros', () => {
	let nomeEstudante;
	let nomeEstudantePopup;
	let nomeEstudantePerfil;

	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();

	cy.get(':nth-child(3) > .tab-content > h2.s-w-OmsN2Ckuj4').click();
	cy.get(':nth-child(2) > .membro-info > .membro-nome').invoke("text").then((text) => {
		nomeEstudante = text;
		cy.log("Texto extraido para o nome do estudante: ", nomeEstudante);
	});

	cy.get(':nth-child(2) > .membro-info > .membro-nome').click();

	cy.get('.estudante-nome-login > h3.s-miw6V-QuaajW').invoke("text").then((text) => {
		nomeEstudantePerfil = text;
		cy.log("Texto extraido para o nome do estudante (Perfil): ", nomeEstudantePerfil);
	});

	cy.then(() => {
		expect(nomeEstudantePerfil).to.contains(nomeEstudante)
	})
});

it('Visualizar boletim de um aluno', () => {
	let nomeEstudante;
	let nomeEstudanteBoletim;

	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(2) > .turma-buttons > .s-5xw9RGpuDz7F').click();

	cy.get('.top-3 > :nth-child(1) > .info-container ').click();
	cy.get('.top-3 > :nth-child(1) > .info-container ').invoke("text").then((text) => {
		nomeEstudante = text.split(" ").slice(0, -2).join(" ");
		cy.log("Texto extraido para o nome do estudante: ", nomeEstudante);
	});

	cy.get('.profile-button').click();
	cy.get('.content-estudante > .button-container > .button').click();

	cy.get('.estudante-info > .row > :nth-child(2)').invoke("text").then((text) => {
		nomeEstudanteBoletim = text;
		cy.log("Texto extraido para o nome do estudante (Perfil): ", nomeEstudanteBoletim);
	});

	cy.then(() => {
		expect(nomeEstudanteBoletim).to.contains(nomeEstudante)
	})
});

it('Criar publicação no mural da turma e criar comentário', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(1) > .turma-buttons > .s-5xw9RGpuDz7F').click();

	/* ==== Generated with Cypress Studio ==== */
	cy.get(':nth-child(1) > .tab-content > h2.s-w-OmsN2Ckuj4').click();
	cy.get('.container > .s-gl8iGQs72fud').click();
	cy.get('#inputTextoPublicacao').type("Texto da nova publicação")
	cy.get(':nth-child(3) > .button').click();
	/* ==== End Cypress Studio ==== */

	cy.get(':nth-child(1) > .publicacao-content > :nth-child(2) > .conteudo-publicacao').should("have.text", "Texto da nova publicação")

	cy.get(':nth-child(1) > .publicacao-content > .input-comentario > .board > #inputTextoComentario').type("Novo comentário!")
	cy.get(':nth-child(1) > .publicacao-content > .input-comentario > .button').click();
	cy.get(':nth-child(1) > .publicacao-content > .comentario-details > summary.s-qSMb0ZAOAwP2').click();
	cy.get(':nth-child(1) > .publicacao-content > .comentario-details > .comentario-container > .comentario-content > .conteudo-comentario').should("have.text", "Novo comentário!")
});

it('Ver popup de adicionar aluno na turma', () => {
	cy.viewport(1920, 1080);
	cy.visit('http://localhost:5173/');
	cy.wait(500)
	cy.get('#loginInput').clear('T');
	cy.get('#loginInput').type('alan.turing');
	cy.get('#passwordInput').clear('S');
	cy.get('#passwordInput').type('Senhavalida!1');
	cy.get('#btnLogin').should("be.visible");
	cy.get('#btnLogin').click();
	cy.get('#btnProfessor').should("be.visible");
	cy.get('#btnProfessor').click();
	cy.get(':nth-child(1) > .turma-buttons > .s-5xw9RGpuDz7F').click();
	cy.get('.container > .button').click();
});
