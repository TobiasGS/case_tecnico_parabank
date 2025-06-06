describe('Solicitar emprestimo', () => {

    beforeEach(() => {
        cy.site() 
        cy.login()
    })

it('Validar solicitação de emprestimo aprovado com sucesso', () => {

    cy.get('#leftPanel > ul > :nth-child(7) > a').click() //Emprestimo
    cy.get('#amount').type('103.33') //Valor do emprestimo
    cy.get('#downPayment').type('30') //Valor de entrada
    cy.get('[colspan="2"] > .button').click() //Solicita o emprestimo
    cy.get('#requestLoanResult > .title').should('contain', 'Loan Request Processed')
    cy.get('#loanProviderName').should('contain', 'Jiffy Mortgage Solutions (JMS)')
    cy.get('#loanStatus').should('contain', 'Approved')
    cy.get(':nth-child(2) > b').should('contain', 'Your new account number:')
})

it('Validar abertura de conta quando emprestimo aprovado', () => {
    
    cy.emprestimo('1000.00', '312,01')
    
    cy.get('#newAccountId').should('exist') //Verifico a nova conta aberta
        .and('be.visible')
        .invoke('text')
        .then((accountNumber) => {
    cy.log('Nova conta', accountNumber); //Informo para o usuário

    cy.get('#newAccountId').click()
    cy.get('#accountDetails > .title').should('contain', 'Account Details')
    cy.get('#accountId').should('contain', accountNumber) //Valido que a conta aberta é a mesma apos emprestimo aprovado
    cy.get('#accountType').should('contain', 'LOAN') //Valido o tipo da conta
    cy.get('#balance').should('contain', '$505.33')
        })
    
    })

it('Validar o valor do empréstimo sejá o mesmo da abertura de conta', () => {

  cy.emprestimo('222.11', '100'); // Insere o valor no campo amount dentro do commands
  cy.get('#loanStatus').should('contain', 'Approved')
  cy.get('#newAccountId').click();
  cy.get('#accountDetails > .title').should('contain', 'Account Details');
  cy.get('#accountType').should('contain', 'LOAN'); //Valido o tipo de conta
  cy.get('#balance').should('contain', '222.11') //Valido o valor do emprestimo é o mesmo solicitado

});

it('Validar que não é possivel realizar emprestimos com entrada menor que 20%', () => {

cy.ajustarPorcentagem() //Ajuste a % antes de realizar o teste
cy.emprestimo('100', '19'); // Insere o valor no campo amount dentro do commands

cy.get('#loanStatus').should('contain', 'Denied')
cy.get('#loanRequestDenied > .error').should('contain', 'We cannot grant a loan in that amount with the given down payment.')
  

});



})

/*Cenarios que poderiam ser aplicados
    - Não deveria ser possivel realizar emprestimo com valor negativo


    OBS: 
*/