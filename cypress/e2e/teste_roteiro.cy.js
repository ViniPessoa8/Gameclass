// it('Cadastro', function() {
// cy.viewport(1920, 1080);
// 	cy.visit('http://localhost:5173/');
// 	cy.wait(500)
// 	cy.get('#btnCadastro').should("be.visible");
// 	cy.get('#btnCadastro').click();
// 	cy.wait(500)
// 	cy.get(':nth-child(1) > .unboard > .unborded').clear('T');
// 	cy.get(':nth-child(1) > .unboard > .unborded').type('Teste');
// 	cy.get('.card-container > :nth-child(2)').click();
// 	cy.get(':nth-child(2) > .unboard > .unborded').clear('te');
// 	cy.get(':nth-child(2) > .unboard > .unborded').type('teste@teste.com');
// 	cy.get(':nth-child(3) > .unboard > .unborded').clear('T');
// 	cy.get(':nth-child(3) > .unboard > .unborded').type('Teste');
// 	cy.get(':nth-child(4) > .input').clear('S');
// 	cy.get(':nth-child(4) > .input').type('Senhavalida!1');
// 	cy.get('.card-container > :nth-child(5)').click();
// 	cy.get(':nth-child(5) > .input').clear('S');
// 	cy.get(':nth-child(5) > .input').type('Senhavalida!1');
// 	cy.get('#inputDtInicioEtapa').type("2025-10-08T16:37");
// 	cy.get('.container > .s-gl8iGQs72fud').click();
// 	cy.get('.button').click();
// 	cy.get('#loginInput').clear('T');
// 	cy.get('#loginInput').type('Teste');
// 	cy.get('#passwordInput').clear('S');
// 	cy.get('#passwordInput').type('Senhavalida!1');
// 	cy.get('.s-5xw9RGpuDz7F').click();
// 	cy.get('.button-professor > div.s-76bjOAAZraKf > .icon').click();
// 	cy.get('.buttons > :nth-child(2)').click();
// });

it('Criação de Turma', function() {
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
    // cy.get('#btnCriarNovaTurma').click();
    cy.get('.sidebar > .button').click();
    cy.wait(500)
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(1) > div.s-vsi8GcpSRwtX > .board > .borded').clear('0');
    cy.get(':nth-child(1) > div.s-vsi8GcpSRwtX > .board > .borded').type('0001');
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
    /* ==== End Cypress Studio ==== */
});
