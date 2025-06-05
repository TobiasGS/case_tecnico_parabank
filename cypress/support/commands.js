Cypress.Commands.add('site', () => {
  cy.visit('https://parabank.parasoft.com/parabank/index.htm')
});


Cypress.Commands.add('login', () => {
  cy.get(':nth-child(2) > .input').type('TobiasG')
  cy.get(':nth-child(4) > .input').type('12345678')
  cy.get(':nth-child(5) > .button').click()
})


Cypress.Commands.add('contaCorrente', () => {

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() //Tranferencia
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')
    cy.get('#amount').type('100') //Valor da transferencia
    cy.get('#toAccountId option').eq(1).then($option => { //seleciona a segunda opção de conta para transferir
    cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get(':nth-child(4) > .button').click() //Confirmar transferencia
    cy.get('#showResult > .title').should('contain', 'Transfer Complete!')
    cy.get('#showResult > :nth-child(2)').should('contain', '$100.00 has been transferred from account') 
    cy.get('#showResult > :nth-child(3)').should('contain', 'See Account Activity for more details.')

})

Cypress.Commands.add('contaPoupança', () => {

    cy.get('#leftPanel > ul > :nth-child(3) > a').click() //Tranferencia
    cy.get('#showForm > .title').should('contain', 'Transfer Funds')
    cy.get('#amount').type('100.01') //Valor da transferencia
    cy.get('#fromAccountId option').eq(1).then($option => { //seleciona a segunda opção de conta para transferir
    cy.get('#fromAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get('#toAccountId option').eq(0).then($option => { //seleciona a segunda opção de conta para transferir
    cy.get('#toAccountId').select($option.val()) //Pega o valor encontrado e seleciona
})
    cy.get(':nth-child(4) > .button').click() //Confirmar transferencia
    cy.get('#showResult > .title').should('contain', 'Transfer Complete!')
    cy.get('#showResult > :nth-child(2)').should('contain', '$100.01 has been transferred from account') 
    cy.get('#showResult > :nth-child(3)').should('contain', 'See Account Activity for more details.')

})



Cypress.Commands.add('gerarDadosPessoais', () => {
  const nomes = ['Ana', 'Carlos', 'Beatriz', 'Fernando', 'Lucas', 'Mariana', 'Paulo', 'Juliana', 'Tiago', 'Renata'];
  const sobrenomes = ['Silva', 'Souza', 'Oliveira', 'Santos', 'Pereira', 'Costa', 'Rodrigues', 'Almeida', 'Nascimento', 'Araujo'];
  const ruas = ['Rua das Flores', 'Avenida Paulista', 'Travessa Central', 'Rua do Comércio', 'Alameda Santos'];
  const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Salvador'];

  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  const endereco = `${ruas[Math.floor(Math.random() * ruas.length)]}, ${Math.floor(Math.random() * 1000)}`;
  const cidade = cidades[Math.floor(Math.random() * cidades.length)];

  return { nome, sobrenome, endereco, cidade };
});
