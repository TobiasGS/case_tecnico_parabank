Cypress.Commands.add('site', () => {
  cy.visit('https://parabank.parasoft.com/parabank/index.htm')
});


Cypress.Commands.add('login', () => {
  cy.get(':nth-child(2) > .input').type('TobiasGGGS')
  cy.get(':nth-child(4) > .input').type('12345678')
  cy.get(':nth-child(5) > .button').click()
})