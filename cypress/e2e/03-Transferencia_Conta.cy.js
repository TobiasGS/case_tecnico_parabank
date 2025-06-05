describe('Realizar transferencia entre conta', () => {

beforeEach(() => {

    cy.site()
    cy.login()
})

it('Realizar transferencia com sucesso', () => {

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() //Tranferencia
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')
    cy.get('#amount').type('100') //Valor da transferencia
    cy.get('#toAccountId option').eq(1).then($option => { //seleciona a segunda opção de conta para transferir por ser um valor aleatorio
    cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get(':nth-child(4) > .button').click() //Confirmar transferencia
    cy.get('#showResult > .title').should('contain', 'Transfer Complete!')
    cy.get('#showResult > :nth-child(2)').should('contain', '$100.00 has been transferred from account') 
    cy.get('#fromAccountIdResult').should('exist') //Pego a informação do campo
        .and('be.visible')
        .invoke('text')
        .then((contaOrigem) => {
    cy.log('Conta de origem:', contaOrigem) //Exibo na tela
    })
    cy.get('#toAccountIdResult').should('exist')
        .and('be.visible')
        .invoke('text')
        .then((contaDestino) => {
    cy.log('Conta de destino:', contaDestino) //Exibo na tela
    })
    cy.get('#showResult > :nth-child(3)').should('contain', 'See Account Activity for more details.')

})

it('Realizar 5 transferências com sucesso para historico', () => {
  Cypress._.times(5, () => { //Executa o teste 5x para gerar hisotrico de transferencia

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() // Transferência
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')

    cy.get('#amount').clear().type('10') // Valor da transferência

    cy.get('#toAccountId option').eq(1).then($option => { //seleciona a segunda opção de conta para transferir por ser um valor aleatorio
      cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
    })

    cy.get(':nth-child(4) > .button').click() //Confirmar transferencia

    cy.get('#showResult > .title').should('contain', 'Transfer Complete!')
    cy.get('#showResult > :nth-child(2)').should('contain', '$10.00 has been transferred')
    cy.get('#showResult > :nth-child(3)').should('contain', 'See Account Activity for more details.')
  })
})

it('Tentativa de transferencia com caractere invalido no campo valor', () => {

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() //Tranferencia
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')
    cy.get('#amount').type('100@00') //Valor da transferencia ' , ' ou ' @ '
    cy.get('#toAccountId option').eq(1).then($option => { //seleciona a segunda opção de conta para transferir por ser um valor aleatorio
    cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get(':nth-child(4) > .button').click() //Confirmar transferencia
    cy.get('#showError > .title').should('contain', 'Error!')
    cy.get('#showError > .error').should('contain', 'An internal error has occurred and has been logged.')

})

it('Validar historico de transferencia debitado na conta', () => {

    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click() //Seleciono minha conta Corrente
    cy.get('#accountDetails > .title').should('contain', 'Account Details')
    cy.get('tbody > :nth-child(1) > :nth-child(2) > a').click() //pego a primeira transação da tabela
    cy.get('.title').should('have.text', 'Transaction Details')
    cy.get('tbody > :nth-child(3) > :nth-child(2)').should('have.text', 'Funds Transfer Sent')
    cy.get(':nth-child(4) > :nth-child(2)').should('have.text', 'Debit') //Tipo de transferencia = Debitado

})

it('Validar historico de transferencia creditado na conta', () => {

    cy.get('tbody > :nth-child(2) > :nth-child(1) > a').click() //Seleciono minha segunda conta Pupança
    cy.get('#accountDetails > .title').should('contain', 'Account Details')
    cy.get('tbody > :nth-child(1) > :nth-child(2) > a').click() //pego a primeira transação da tabela
    cy.get('.title').should('have.text', 'Transaction Details')
    cy.get('tbody > :nth-child(3) > :nth-child(2)').should('have.text', 'Funds Transfer Received')
    cy.get(':nth-child(4) > :nth-child(2)').should('have.text', 'Credit') //Tipo de transferencia = Creditado

})

it('Validar transferencia entre Conta corrente e poupança', () => {

    cy.contaCorrente() //Chamo o comando de trsnaferencia de conta corrente para poupança

    cy.get('#leftPanel > ul > :nth-child(2) > a').click() //Verificar contas
    cy.get('#showOverview > .title').contains('Accounts Overview')
    cy.get('tbody > :nth-child(2) > :nth-child(1) > a').click()
    cy.get('#accountType').contains('SAVINGS')
    cy.get('tbody > :nth-child(1) > :nth-child(2) > a').click() //Pego a primeiro hisotrico de transferencia
    cy.get('tbody > :nth-child(3) > :nth-child(2)').contains('Funds Transfer Received') //Descrição da transferencia Credito
    cy.get(':nth-child(4) > :nth-child(2)').contains('Credit')
})

it('Validar transferencia entre Conta poupança e corrente', () => {

    cy.contaPoupança() //Chamo o comando de transferencia de conta poupança para corrente

    cy.get('#leftPanel > ul > :nth-child(2) > a').click() //Verificar contas
    cy.get('#showOverview > .title').contains('Accounts Overview')
    cy.get('tbody > :nth-child(2) > :nth-child(1) > a').click()
    cy.get('#accountType').contains('SAVINGS')
    cy.get('tbody > :nth-child(1) > :nth-child(2) > a').click() //Pego a primeiro hisotrico de transferencia
    cy.get('tbody > :nth-child(3) > :nth-child(2)').contains('Funds Transfer Received') //Descrição da transferencia Credito
    cy.get(':nth-child(4) > :nth-child(2)').contains('Credit')
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

/*it('Tentativa de transferencia sem saldo na conta', () => {

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() //Tranferencia
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')
    cy.get('#amount').type('900.00') //Valor da transferencia
    cy.get('#toAccountId option').eq(1).then($option => { //seleciona a segunda opção de conta para transferir
    cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get(':nth-child(4) > .button').click()
    cy.get('#showError > .title').should('contain', 'Error!')
    cy.get('#showError > .error').should('contain', 'An internal error has occurred and has been logged.')

})*/




/*Cenarios que poderiam ser aplicados
    - Identificação do ID de transferencia é diferente entre conta
    - Transferencia sem saldo na conta não deveria ser possivel
    - Transferencia para a mesma conta não deveria ser possivel
    - Transferencia negativa "-100.00" não deveria ser possivel
    - Ter limitação no valor maximo da transferencia
    - Validação de limitação do campo valor
    - Validação da mascara do Valor R$ x.xxx,xx


    OBS: 
*/

})