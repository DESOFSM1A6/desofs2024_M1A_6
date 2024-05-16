/// <reference types="cypress" />

describe('camiao', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:4200/')
        cy.get('a[routerLink*="/login"]').click()
        cy.get('input[id="email"]').type("admin@email.com").should('have.value', 'admin@email.com')
        cy.get('input[id="password"]').type("12345").should('have.value', '12345')
        cy.get('button[type="submit"]').click()
        cy.get('a[routerLink*="/camiao"]').click()
    }),

        it('Create a camiao', () => {

           

            //Caracteristica
            //Put valid caracteristica
            cy.get('input[name="camiaoCaracteristica"]').type('Maquinaum').should('have.value', 'Maquinaum')

            //tara
            //Good input
            cy.get('input[name="camiaoTara"]').clear().type('9560')

            //capacidade kg
            //Good input
            cy.get('input[name="camiaoCapacidadeMassa"]').clear().type('5600')

            //capacidade kWh
            //Good input
            cy.get('input[name="camiaoCapacidadekWh"]').clear().type('124')

            //Autonomia
            //Good input
            cy.get('input[name="camiaoAutonomia"]').clear().type('250')

            //Tempo de carregamento
            //Good input
            cy.get('input[name="camiaoTempoCarregamento"]').clear().type('250')

            //Click to register
            cy.get('button[id="registar-button"]').click()
            cy.get('div').contains('CamiaoService: added camiao w/ caracteristica=Maquinaum')
            //Value is on table
            cy.contains('td', 'Maquinaum')


            
        }),
        afterEach(() =>{
            cy.request('DELETE', "https://two2s5-dk-64.onrender.com/api/Camiao/Maquinaum")
            .should((response) => {
                expect(response.status).to.eq(204)
            });
        })
});