describe('Realizar transferencia entre conta', () => {

beforeEach(() => {

    cy.site()
    cy.login()
})

it('Realizar transferencia com sucesso', () => {

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() //Tranferencia
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')
    cy.get('#amount').type('100') //Valor da transferencia
    cy.get('#toAccountId option').eq(1).then($option => { //seleciona a segunda opção de conta para transferir
    cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get(':nth-child(4) > .button').click() //Confirmar transferencia
    cy.get('#showResult > .title').should('contain', 'Transfer Complete!')
    cy.get('#showResult > :nth-child(2)').should('contain', '$100.00 has been transferred from account') 
    cy.get('#fromAccountIdResult').should('exist') //Pego a informação do campo
        .and('be.visible')
        .invoke('text')
        .then((contaOrigem) => {
    cy.log('Total da conta:', contaOrigem)
    })
    cy.get('#toAccountIdResult').should('exist')
        .and('be.visible')
        .invoke('text')
        .then((contaDestino) => {
    cy.log('Total da conta:', contaDestino)
    })
    cy.get('#showResult > :nth-child(3)').should('contain', 'See Account Activity for more details.')

})

it('Realizar 5 transferências com sucesso para historico', () => {
  Cypress._.times(5, () => { //Executa o teste 5x para gerar hisotrico de transferencia

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() // Transferência
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')

    cy.get('#amount').clear().type('10') // Valor da transferência

    cy.get('#toAccountId option').eq(1).then($option => { //Ler a informação da segunda opção
      cy.get('#toAccountId').select($option.val()) //seleciona a segunda opção
    })

    cy.get(':nth-child(4) > .button').click() //Confirmar transferencia

    cy.get('#showResult > .title').should('contain', 'Transfer Complete!')
    cy.get('#showResult > :nth-child(2)').should('contain', '$10.00 has been transferred')
    cy.get('#showResult > :nth-child(3)').should('contain', 'See Account Activity for more details.')
  })
})


it('Tentativa de transferencia com caractere invalido', () => {

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() //Tranferencia
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')
    cy.get('#amount').type('100@00') //Valor da transferencia ' , ' ou ' @ '
    cy.get('#toAccountId option').eq(1).then($option => { //seleciona a segunda opção de conta para transferir
    cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get(':nth-child(4) > .button').click() //Confirmar transferencia
    cy.get('#showError > .title').should('contain', 'Error!')
    cy.get('#showError > .error').should('contain', 'An internal error has occurred and has been logged.')

})

/*it.only('Transferencia para mesma conta', () => {

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() //Tranferencia
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')
    cy.get('#amount').type('900.00') //Valor da transferencia
    cy.get('#toAccountId option').eq(0).then($option => { //seleciona a segunda opção de conta para transferir
    cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get(':nth-child(4) > .button').click()
    cy.get('#showError > .title').should('contain', 'Error!')
    cy.get('#showError > .error').should('contain', 'An internal error has occurred and has been logged.')

})*/

it('Tentativa de transferencia sem saldo na conta', () => {

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() //Tranferencia
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')
    cy.get('#amount').type('900.00') //Valor da transferencia
    cy.get('#toAccountId option').eq(1).then($option => { //seleciona a segunda opção de conta para transferir
    cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get(':nth-child(4) > .button').click()
    cy.get('#showError > .title').should('contain', 'Error!')
    cy.get('#showError > .error').should('contain', 'An internal error has occurred and has been logged.')

})




/*Cenarios que poderiam ser aplicados
    - Tentativa de transferencia sem saldo na conta
    - Transferencia para a mesma conta não deveria ser possivel
    - Validação de limitação do campo valor

    OBS: poderia ser criado uma constant para quardar o valor da conta e validar na mensagem de transferencia
*/

})