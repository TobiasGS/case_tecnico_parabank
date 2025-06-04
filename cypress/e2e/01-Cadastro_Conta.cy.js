
describe('Cadastro de conta bancária', () => {
  
  beforeEach(() => {
    cy.site()
  })
  
  it('Validar que os campos de cadastro existem', () => {

    cy.get('#loginPanel > :nth-child(3) > a').click() //Clica em registrar

    cy.contains('First Name:').should('be.visible') //Primeiro nome
    cy.contains('Last Name:').should('be.visible') //Sobre nome
    cy.contains('Address:').should('be.visible') //Endereço
    cy.contains('City:').should('be.visible') //Cidade
    cy.contains('State:').should('be.visible') //Estado
    cy.contains('Zip Code:').should('be.visible') //CEP
    cy.contains('Phone #:').should('be.visible') //Telefone
    cy.contains('SSN:').should('be.visible') //Numero social
    cy.contains('Username:').should('be.visible') //Nome de usuario
    cy.contains('Password:').should('be.visible') //Senha
    cy.contains('Confirm:').should('be.visible') //Confirmar senha
    
  })
  
  it('Cadastro de uma nova conta com sucesso', () => {

    cy.get('#loginPanel > :nth-child(3) > a').click() //Clica em registrar
    cy.get('#customer\\.firstName').type('Tobias') //Primeiro nome
    cy.get('#customer\\.lastName').type('Gomes') //Sobre nome
    cy.get('#customer\\.address\\.street').type('Rua centro') //Endereço
    cy.get('#customer\\.address\\.city').type('Caninde') //Cidade
    cy.get('#customer\\.address\\.state').type('Ceara') //Estado
    cy.get('#customer\\.address\\.zipCode').type('62700000') //CEP
    cy.get('#customer\\.phoneNumber').type('85992920101') //Telefone
    cy.get('#customer\\.ssn').type('10102020303') //Numero social
    cy.get('#customer\\.username').type('TobiasG') //Nome de usuario
    cy.get('#customer\\.password').type('12345678') //Senha
    cy.get('#repeatedPassword').type('12345678') //Confirmar senha

    cy.get('[colspan="2"] > .button').click() //Registrar
    cy.contains('Welcome TobiasG').should('be.visible') //Validar mensagem de bem vindo ao cadastro com sucesso
    cy.get('#leftPanel > ul > :nth-child(2) > a').click()
    cy.get('#showOverview > .title').contains('Accounts Overview');
    cy.get('[align="right"] > b').contains('Total') //Disponivel 
    cy.get(':nth-child(2) > b').should('exist')
        .and('be.visible')
        .invoke('text')
        .then((accountNumber) => {
    cy.log('Total da conta:', accountNumber);
  })
  })

  it('Não é possivel cadastrar o mesmo usuarios ja cadastrado', () => {

    cy.get('#loginPanel > :nth-child(3) > a').click() //Clica em registrar
    cy.get('#customer\\.firstName').type('Tobias') //Primeiro nome
    cy.get('#customer\\.lastName').type('Gomes') //Sobre nome
    cy.get('#customer\\.address\\.street').type('Rua centro') //Endereço
    cy.get('#customer\\.address\\.city').type('Caninde') //Cidade
    cy.get('#customer\\.address\\.state').type('Ceara') //Estado
    cy.get('#customer\\.address\\.zipCode').type('62700000') //CEP
    cy.get('#customer\\.phoneNumber').type('85992920101') //Telefone
    cy.get('#customer\\.ssn').type('10102020303') //Numero social
    cy.get('#customer\\.username').type('TobiasG') //Nome de usuario
    cy.get('#customer\\.password').type('12345678') //Senha
    cy.get('#repeatedPassword').type('12345678') //Confirmar senha

    cy.get('[colspan="2"] > .button').click() //Registrar
    cy.get('#customer\\.username\\.errors').should('have.text', 'This username already exists.')

    
  })


   it('Validar mensagem de campo obrigatorio na tentativa de cadastro com campos vazios', () => {

    cy.get('#loginPanel > :nth-child(3) > a').click() //Clica em registrar

    cy.get('[colspan="2"] > .button').click() //Registrar
    cy.get('#customer\\.firstName\\.errors').should('have.text', 'First name is required.') //Primeiro nome erro
    cy.get('#customer\\.lastName\\.errors').should('have.text', 'Last name is required.') //Sobre nome
    cy.get('#customer\\.address\\.street\\.errors').should('have.text', 'Address is required.') //Endereço
    cy.get('#customer\\.address\\.city\\.errors').should('have.text', 'City is required.') //Cidade
    cy.get('#customer\\.address\\.state\\.errors').should('have.text', 'State is required.') //Estado
    cy.get('#customer\\.address\\.zipCode\\.errors').should('have.text', 'Zip Code is required.') //CEP
    //telefone
    cy.get('#customer\\.ssn\\.errors').should('have.text', 'Social Security Number is required.') //Numero social
    cy.get('#customer\\.username\\.errors').should('have.text', 'Username is required.') //Nome de usuario
    cy.get('#customer\\.password\\.errors').should('have.text', 'Password is required.') //Senha
    cy.get('#repeatedPassword\\.errors').should('have.text', 'Password confirmation is required.') //Confirmar senha
    
  })

  it('Abrir uma nova conta para transferencia', () => {

    cy.login()
    //Criar nova conta
    cy.get('#leftPanel > ul > :nth-child(1) > a').click()
    cy.get('#type').select('1').wait(1000)
    cy.get('#fromAccountId').select(0).wait(1000);
    cy.get('form > div > .button').should('have.value', 'Open New Account').click()
    cy.get('#openAccountResult > .title').should('have.text', 'Account Opened!')
    cy.get(':nth-child(3) > b').should('have.text', 'Your new account number:')

  })

   it('Abrir uma nova conta', () => {

    cy.get('#loginPanel > :nth-child(3) > a').click() //Clica em registrar
    cy.get('#customer\\.firstName').type('Tobias') //Primeiro nome
    cy.get('#customer\\.lastName').type('Gomes') //Sobre nome
    cy.get('#customer\\.address\\.street').type('Rua centro') //Endereço
    cy.get('#customer\\.address\\.city').type('Caninde') //Cidade
    cy.get('#customer\\.address\\.state').type('Ceara') //Estado
    cy.get('#customer\\.address\\.zipCode').type('62700000') //CEP
    cy.get('#customer\\.phoneNumber').type('85992920101') //Telefone
    cy.get('#customer\\.ssn').type('10102020303') //Numero social
    cy.get('#customer\\.username').type('TobiasS') //Nome de usuario
    cy.get('#customer\\.password').type('12345678') //Senha
    cy.get('#repeatedPassword').type('12345678') //Confirmar senha

    cy.get('[colspan="2"] > .button').click() //Registrar
    cy.contains('Welcome TobiasS').should('be.visible') //Validar mensagem de bem vindo ao cadastro com sucesso
    cy.get('#leftPanel > ul > :nth-child(2) > a').click()
    cy.get('#showOverview > .title').contains('Accounts Overview');
    cy.get('[align="right"] > b').contains('Total') //Disponivel 
    cy.get(':nth-child(2) > b').should('exist')
        .and('be.visible')
        .invoke('text')
        .then((accountNumber) => {
    cy.log('Total da conta:', accountNumber)
  });
  });
  
 /* Cenarios que poderiam ser implementados
    
    - Validar limitação dos campos
    - Os campos numericos como Zip Code, Phone e SSN só devem aceitar numero
    - Mascara "- e ." dos campos Phone, Zip Code

    */


})
