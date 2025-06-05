describe('Limpar banco apos execução dos teste', () => {

beforeEach(() => {

    cy.site()
})

it('Limpar o banco de daos apos a execução dos testes', () => {

    cy.get('.leftmenu > :nth-child(6) > a').click() //Acessa pagina de ADMIN
    cy.get('tr > :nth-child(2) > .button').click() //Limpar o banco de dados

})


})
