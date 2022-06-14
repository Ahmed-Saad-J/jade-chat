describe('login', () => {

  beforeEach(()=>{
    cy.visit('/')
  })

  it('correct credentials', () => {
    cy.get('.lemail').type('test@mail.com')
    cy.get('.lpassword').type('test')
    cy.get('.login-btn').click()
    cy.url().should('include','/chat') 
  })
  it('wrong email', () => {
    cy.get('.lemail').type('wrong@mail.com')
    cy.get('.lpassword').type('test')
    cy.get('.login-btn').click()
    cy.url().should('equal','http://localhost:3000/')
  })
  it('wrong password', () => {
    cy.get('.lemail').type('test@mail.com')
    cy.get('.lpassword').type('wrong')
    cy.get('.login-btn').click()
    cy.url().should('equal','http://localhost:3000/')
  })
})