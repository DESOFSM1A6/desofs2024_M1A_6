/// <reference types="cypress" />

describe('warehouse', () => {
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
        cy.get('a[routerLink*="/warehouse"]').click()
    }),

        it('Create a warehouse', () => {

            //Check if button is disabled
            cy.get('button[id="registar-button"]').should('be.disabled')

            //WarehouseID
            //Check if form is empty and type invalid ID
            cy.get('input[id="warehouseId"]').should('have.value', '').type('INVALID')
            //Check if warning message shows up
            cy.get('div.alert.alert-danger').contains('Armazém deve ser 3 caracteres alfanuméricos')
            //Clear message, should trigger required field since its now a dirty input
            cy.get('input[id="warehouseId"]').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Put valid ID
            cy.get('input[id="warehouseId"]').type('TE1').should('have.value', 'TE1')

            //Description
            //Dirty input and clear
            cy.get('input[id="description"]').should('have.value', '').type('text').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Trigger max desc size
            cy.get('input[id="description"]').clear().type('8wQuGVM2aM0sHGjNcTgxZqrRlmN17bx9qq8ZkPsSVyJqjTfqzn1')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Descrição tem um limite de 50 caracteres')
            //Good input
            cy.get('input[id="description"]').clear().type('A Description')

            //Latitude Hours
            //Dirty input and clear
            cy.get('input[id="latitudeHrs"]').should('have.value', '').type('1').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Test Lower Boundary
            cy.get('input[id="latitudeHrs"]').should('have.value', '').type('-1')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Valor tem de ser de 0 a 90')
            //Test Higher Boundary
            cy.get('input[id="latitudeHrs"]').clear().type('91')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Valor tem de ser de 0 a 90')
            //Valid input
            cy.get('input[id="latitudeHrs"]').clear().should('have.value', '').type('44')

            //Latitude Mins
            //Dirty input and clear
            cy.get('input[id="latitudeMins"]').should('have.value', '').type('1').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Test Lower Boundary
            cy.get('input[id="latitudeMins"]').should('have.value', '').type('-1')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Valor tem de ser de 0 a 60')
            //Test Higher Boundary
            cy.get('input[id="latitudeMins"]').clear().type('61')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Valor tem de ser de 0 a 60')
            //Valid input
            cy.get('input[id="latitudeMins"]').clear().should('have.value', '').type('44')

            //Latitude Dir
            //Check if Empty and Select
            cy.get('select[id="latitudeDir"]').should('have.value', null).select('N')

            //Longitude Hours
            //Dirty input and clear
            cy.get('input[id="longitudeHrs"]').should('have.value', '').type('1').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Test Lower Boundary
            cy.get('input[id="longitudeHrs"]').should('have.value', '').type('-1')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Valor tem de ser de 0 a 180')
            //Test Higher Boundary
            cy.get('input[id="longitudeHrs"]').clear().type('181')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Valor tem de ser de 0 a 180')
            //Valid input
            cy.get('input[id="longitudeHrs"]').clear().should('have.value', '').type('44')

            //Longitude Mins
            //Dirty input and clear
            cy.get('input[id="longitudeMins"]').should('have.value', '').type('1').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Test Lower Boundary
            cy.get('input[id="longitudeMins"]').should('have.value', '').type('-1')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Valor tem de ser de 0 a 60')
            //Test Higher Boundary
            cy.get('input[id="longitudeMins"]').clear().type('61')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Valor tem de ser de 0 a 60')
            //Valid input
            cy.get('input[id="longitudeMins"]').clear().should('have.value', '').type('44')

            //Longitude Dir
            //Check if Empty and Select
            cy.get('select[id="longitudeDir"]').should('have.value', null).select('E')

            //Altitude 
            //Dirty input and clear
            cy.get('input[id="altitude"]').should('have.value', '').type('1').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Test Lower Boundary
            cy.get('input[id="altitude"]').should('have.value', '').type('-451')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Valor tem de ser superior a -450')
            //Valid input
            cy.get('input[id="altitude"]').clear().should('have.value', '').type('40')

            //Street
            //Dirty input and clear
            cy.get('input[id="street"]').should('have.value', '').type('a').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Valid input
            cy.get('input[id="street"]').clear().should('have.value', '').type('Rua dos Buracos')

            //Local
            //Dirty input and clear
            cy.get('input[id="local"]').should('have.value', '').type('a').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Valid input
            cy.get('input[id="local"]').clear().should('have.value', '').type('Buraqueira')

            //PostalCode
            //Dirty input and clear
            cy.get('input[id="postalCode"]').should('have.value', '').type('a').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Bad Formatting
            cy.get('input[id="postalCode"]').clear().type('222-2222')
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Código de postal inválido')
            //Valid input
            cy.get('input[id="postalCode"]').clear().should('have.value', '').type('4444-444')

            //Country
            //Dirty input and clear
            cy.get('input[id="country"]').should('have.value', '').type('a').clear()
            //Check if warning shows up
            cy.get('div.alert.alert-danger').contains('Campo Obrigatório')
            //Valid input
            cy.get('input[id="country"]').clear().should('have.value', '').type('Buracão')

            //Click to register
            cy.get('button[id="registar-button"]').not('be.disabled').click()
            cy.get('div').contains('WarehouseService: added warehouse w/ id=TE1')
            //Value is on table
            cy.contains('td', 'TE1')

        }),
        it('Fast input to get error', () => {
            //Yes, I could use the form insert thing, but no.
            cy.get('input[id="warehouseId"]').type('TE1')
            cy.get('input[id="description"]').type('A Description')
            cy.get('input[id="latitudeHrs"]').type('44')
            cy.get('input[id="latitudeMins"]').type('44')
            cy.get('select[id="latitudeDir"]').select('N')
            cy.get('input[id="longitudeHrs"]').type('44')
            cy.get('input[id="longitudeMins"]').type('44')
            cy.get('select[id="longitudeDir"]').select('E')
            cy.get('input[id="altitude"]').type('40')
            cy.get('input[id="street"]').should('have.value', '').type('Rua dos Buracos')
            cy.get('input[id="local"]').should('have.value', '').type('Buraqueira')
            cy.get('input[id="postalCode"]').should('have.value', '').type('4444-444')
            cy.get('input[id="country"]').should('have.value', '').type('Buracão')
            cy.get('button[id="registar-button"]').not('be.disabled').click()
            cy.get('div').contains('Warehouse: Http failure response')

            //FIXME: THIS NEEDS TO BE MOVED ONTO A CONFIG FILE!
            cy.request('DELETE', "https://22s5-dk-64-mda.azurewebsites.net/api/Warehouses/TE1")
                .should((response) => {
                    expect(response.status).to.eq(200)
                });
        });
});