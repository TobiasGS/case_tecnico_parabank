describe('Configuração e limpesa do banco antes de iniciar os testes', () => {

    beforeEach(() => {
        cy.site()
    })

    it.only('Configuração e inicialização do banco', () => {

        cy.get('.leftmenu > :nth-child(6) > a').click()

        cy.get(':nth-child(1) > :nth-child(2) > form > .form2 > tbody > tr > [width="20%"]') //Campo de status
            .invoke('text') 
            .then((status) => {
                if (status.trim() === 'Stopped') {
                    cy.get('[width="50%"] > .button').click()
                }
            })
        cy.get('#initialBalance').clear().type('1000')
        cy.get('#minimumBalance').clear().type('10')
        cy.get('#loanProcessor').select('Down Payment')
            
        cy.ajustarPorcentagem()
       
    })


})