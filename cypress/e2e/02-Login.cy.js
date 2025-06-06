describe('Realizar login', () => {

beforeEach(() => {
        cy.site()
    })

it('Realizar login com sucesso', () => {

    cy.login()
    cy.get('.smallText').should('contain', 'Welcome Tobias Gomes').and('be.visible') //Validar mensagem de bem vindo ao realizar Login

})

it.only('Realizar tentativa de login com dados invalidos', () => {

    cy.get(':nth-child(2) > .input').type('ABCDEFG')
    cy.get(':nth-child(4) > .input').type('ASDFET')
    cy.get(':nth-child(5) > .button').click()
    cy.get('.title').should('contain', 'Error!').and('be.visible')
    cy.get('.error').should('contain', 'The username and password could not be verified.').and('be.visible')
    
})

it('Realizar tentativa de login com campos vazios', () => {

    cy.get(':nth-child(5) > .button').click()
    cy.get('.title').should('contain', 'Error!').and('be.visible')
    cy.get('.error').should('have.text', 'Please enter a username and password.').and('be.visible')
    
})


/*Cenarios que poderiam ser implementados

    - Validação da limitação dos campos

    */

})