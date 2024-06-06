describe('Login Flow', () => {
    it('Deve redirecionar para a página de home e verificar as permissões de Editor', () => { 
        
      // Visitar a página de login
      cy.visit('http://206.189.24.67:4200/');
      cy.get('button[routerlink="/login"]').click();
      cy.wait(1000);

      cy.get('#username').type('testeeditor@gmail.com');
      cy.get('#password').type('Editor_12345');
  
      // Simular o clique no botão de login, caso exista
      cy.get('input[name="login"]').click();
      cy.wait(1000);
      
      cy.url().should('include', '/home');

      cy.contains('Home');
      cy.contains('Últimas Notícias');
      cy.contains('Submissão de noticias');
      cy.contains('Validação de noticias');
      cy.get('button[routerlink="/logout"]').click();
  });

    it('Deve redirecionar para a página de home e verificar as permissões de Jornalista', () => { 
          
      // Visitar a página de login
      cy.visit('http://206.189.24.67:4200/');
      cy.get('button[routerlink="/login"]').click();
      cy.wait(1000);

      cy.get('#username').type('testejornalista@gmail.com');
      cy.get('#password').type('Jornalista_12345');

      // Simular o clique no botão de login, caso exista
      cy.get('input[name="login"]').click();
      cy.wait(1000);
      
      cy.url().should('include', '/home');

      cy.contains('Home');
      cy.contains('Últimas Notícias');
      cy.contains('Submissão de noticias');

      cy.should('not.contain', 'Validação de noticias');

      cy.request({
        url: '/news-validation',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });

      cy.get('button[routerlink="/logout"]').click();
    });

    it('Deve redirecionar para a página de home e verificar as permissões de Leitor', () => { 
            
      // Visitar a página de login
      cy.visit('http://206.189.24.67:4200/');
      cy.get('button[routerlink="/login"]').click();
      cy.wait(1000);

      cy.get('#username').type('testeleitor@gmail.com');
      cy.get('#password').type('Leitor_12345');

      // Simular o clique no botão de login, caso exista
      cy.get('input[name="login"]').click();
      cy.wait(1000);
      
      cy.url().should('include', '/home');

      cy.contains('Home');
      cy.contains('Últimas Notícias');

      cy.should('not.contain', 'Submissão de noticias');
      cy.should('not.contain', 'Validação de noticias');

      // Tentar visitar a página de submissão de notícias diretamente e verificar o erro 404
      cy.request({
        url: '/news-submission',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });

      cy.request({
        url: '/news-validation',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });

      cy.get('button[routerlink="/logout"]').click();
    });
});