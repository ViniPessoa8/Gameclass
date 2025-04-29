describe('template spec', () => {
	it('cria atividade, 2 etapas e para na página do resumo de critérios', () => {
		cy.viewport(1920, 1080)
		cy.visit('http://localhost:5173/professor/turmas/1/atividades/create')
		if (cy.get('#loginInput').should('be.visible')) {
			cy.get('#loginInput').clear('V');
			cy.get('#loginInput').type('ViniPessoa8');
			cy.get('.input').clear('S');
			cy.get('.input').type('Senhavalida!1');
			cy.get('.s-5xw9RGpuDz7F').click();
		} else {

		}
		cy.get('.button-professor > div.s-76bjOAAZraKf > .icon').click();
		cy.get(':nth-child(1) > .turma-buttons > :nth-child(1)').click();
		cy.get('a.s-XaskQ3CjU9PJ > .button').click();
		cy.get('#inputTitulo').clear('a');
		cy.get('#inputTitulo').type('atividade teste 1');
		cy.get('#inputDescricao').clear('a');
		cy.get('#inputDescricao').type('descricao atividade teste 1');
		cy.get('.bord > .borded').clear('2025-04-30T10:00');
		cy.get('.bord > .borded').type('2025-04-30T10:00');
		cy.get(':nth-child(10) > .button').click();
		cy.get('#inputTituloEtapa').clear('et');
		cy.get('#inputTituloEtapa').type('etapa 1');
		cy.get('#inputDescricaoEtapa').clear('et');
		cy.get('#inputDescricaoEtapa').type('descricao etapa 1');
		cy.get('.container > .s-gl8iGQs72fud').click();
		cy.get(':nth-child(5) > .bord > .borded').clear('2025-04-28T17:00');
		cy.get(':nth-child(5) > .bord > .borded').type('2025-04-28T17:00');
		cy.get(':nth-child(1) > [style="background-color: var(--cor-primaria); padding: 14px;"] > .borded').clear('c');
		cy.get(':nth-child(1) > [style="background-color: var(--cor-primaria); padding: 14px;"] > .borded').type('criterio 1 etapa 1');
		cy.get('.column > :nth-child(2) > .board > .borded').clear('de');
		cy.get('.column > :nth-child(2) > .board > .borded').type('descricao criterio 1');
		cy.get('[style="width: 150px; background-color: var(--cor-primaria); padding: 14px;"] > .borded').clear('5');
		cy.get('[style="width: 150px; background-color: var(--cor-primaria); padding: 14px;"] > .borded').type('5.0');
		cy.get('.btn-add-criterio > .button').click();
		cy.get(':nth-child(1) > [style="background-color: var(--cor-primaria); padding: 14px;"] > .borded').clear('c');
		cy.get(':nth-child(1) > [style="background-color: var(--cor-primaria); padding: 14px;"] > .borded').type('criterio 2 etapa 1');
		cy.get('.column > :nth-child(2) > .board').click();
		cy.get('.column > :nth-child(2) > .board > .borded').clear('de');
		cy.get('.column > :nth-child(2) > .board > .borded').type('descricao criterio 2');
		cy.get('[style="width: 150px; background-color: var(--cor-primaria); padding: 14px;"] > .borded').clear('5');
		cy.get('[style="width: 150px; background-color: var(--cor-primaria); padding: 14px;"] > .borded').type('5.0');
		cy.get('.btn-add-criterio > .button').click();
		cy.get('.etapas-container > .button').click();
		cy.get('.info-container > :nth-child(2) > .board > .borded').clear('et');
		cy.get('.info-container > :nth-child(2) > .board > .borded').type('etapa 2');
		cy.get('.container > .s-gl8iGQs72fud').click();
		cy.get(':nth-child(5) > .bord > .borded').clear('2025-04-29T17:00');
		cy.get(':nth-child(5) > .bord > .borded').type('2025-04-29T17:00');
		cy.get(':nth-child(1) > [style="background-color: var(--cor-primaria); padding: 14px;"] > .borded').clear('c');
		cy.get(':nth-child(1) > [style="background-color: var(--cor-primaria); padding: 14px;"] > .borded').type('criterio unico');
		cy.get('.column > :nth-child(2) > .board').click();
		cy.get('.column > :nth-child(2) > .board > .borded').clear('de');
		cy.get('.column > :nth-child(2) > .board > .borded').type('descricao criterio unico');
		cy.get('[style="width: 150px; background-color: var(--cor-primaria); padding: 14px;"] > .borded').clear('1');
		cy.get('[style="width: 150px; background-color: var(--cor-primaria); padding: 14px;"] > .borded').type('8.0');
		cy.get('.btn-add-criterio > .button').click();
		cy.get('[type="submit"]').click();
		/* ==== End Cypress Studio ==== */
	});
})
