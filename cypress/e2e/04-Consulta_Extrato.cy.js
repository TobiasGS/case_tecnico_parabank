describe('Consultar Extrato da conta', () => {

    beforeEach(() => {
        cy.site()
        cy.login()
    })

    it('Validar as contas abertas do usuario', () => {

        cy.get('#showOverview > .title').contains('Accounts Overview');
        cy.get('thead > tr > :nth-child(1)').contains('Account') //Conta
        cy.get('thead > tr > :nth-child(2)').contains('Balance*') //Movimentação
        cy.get('thead > tr > :nth-child(3)').contains('Available Amount') //Disponivel 
        cy.get('tfoot > tr > td').contains('*Balance includes deposits that may be subject to holds') //Observação
        cy.get('tbody tr').not(':contains("Total")').its('length').then((qtd) => {
            cy.log(`Total de contas abertas: ${qtd}`);
            });
    })

        it('Verificar o extrato de uma nova conta', () => {

        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
        cy.get('#accountDetails > .title').should('have.text', 'Account Details')
        cy.get('#accountDetails > table > tbody > :nth-child(2) > [align="right"]').should('have.text', 'Account Type:')
        cy.get(':nth-child(3) > [align="right"]').should('have.text', 'Balance:')
        cy.get(':nth-child(4) > [align="right"]').should('have.text', 'Available:')
        
        
        cy.get('#noTransactions > b').should('have.text', 'No transactions found.')

    })



})