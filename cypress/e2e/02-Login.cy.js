describe('Realizar login', () => {

beforeEach(() => {
        cy.site()
    })

it('Realizar login com sucesso', () => {

    cy.login()
    cy.get('.smallText').should('contain', 'Welcome Tobias Gomes').and('be.visible') //Validar mensagem de bem vindo ao realizar Login

})

it('Realizar tentativa de login com dados invalidos', () => {

    
    cy.get(':nth-child(2) > .input').type('Teste123')
    cy.get(':nth-child(4) > .input').type('12345678')
    cy.get(':nth-child(5) > .button').click()
    cy.get('.title').should('contain', 'Error!').and('be.visible')
    cy.get('.error').should('contain', 'An internal error has occurred and has been logged.').and('be.visible')
    
})

/*Cenarios que poderiam ser implementados

    - Validação da limitação dos campos

    */

})