
describe('Cadastro de conta bancária', () => {
  
  beforeEach(() => {
    cy.site(); 
  });
  
  it.only('Validar que os campos de cadastro existem', () => {

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

    //cy.get('[colspan="2"] > .button').click() //Registrar
    
  });
  
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

    //cy.get('[colspan="2"] > .button').click() //Registrar
    
  });

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

    //cy.get('[colspan="2"] > .button').click() //Registrar
    //cy.get('#customer\\.username\\.errors').should('have.text', 'This username already exists.')

    
  });


   it('Validar mensagem de campo obrigatorio no cadastro', () => {

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
    
  });

  it('Validar limitação dos campos', () => {
    
  });

  it('Os campos numericos como Zip Code, Phone e SSN só devem aceitar numero', () => {
    
  });


});
