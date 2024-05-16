/// <reference types="cypress" />

describe('delivery', () => {
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
    cy.get('a[routerLink*="/deliveries"]').click()
  }),

    it('Registar entrega', () => {



      //Id
      //Put valid id
      cy.get('input[name="id"]').type('1234').should('have.value', '1234')

      //date
      //Good input
      cy.get('input[name="deliveryDate"]').clear().type('2022-12-10')

      //capacidade massa
      //Good input
      cy.get('input[name="deliveryMass"]').clear().type('8')

      //capacidade timeToPutMin
      //Good input
      cy.get('input[name="timeToPutMin"]').clear().type('5')

      //timeToTakeOffMin
      //Good input
      cy.get('input[name="timeToTakeOffMin"]').clear().type('3')

      //Tempo de warehouseId
      //Good input
      cy.get('select[name="warehouseId"]').should('have.value', null).select('GB5')

      //Click to register
      cy.get('button[id="registar-button"]').click()
      //Value is on table
      cy.contains('td', '1234')

      cy.request('DELETE', "https://22s5-dk-64-mda.azurewebsites.net/api/Delivery/1234")
        .should((response) => {
          expect(response.status).to.eq(200)
        });

    })

});
