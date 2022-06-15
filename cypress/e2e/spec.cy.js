describe('login', () => {

  beforeEach(()=>{
    cy.visit('/')
  })

  it('correct credentials redirect user to the chat page', () => {
    cy.get('.lemail').type('test@mail.com')
    cy.get('.lpassword').type('test')
    cy.get('.login-btn').click()
    cy.url().should('include','/chat') 
  })
  it('wrong email redirect user to the home page', () => {
    cy.get('.lemail').type('wrong@mail.com')
    cy.get('.lpassword').type('test')
    cy.get('.login-btn').click()
    cy.url().should('equal','http://localhost:3000/')
  })
  it('wrong password redirect user to the home page', () => {
    cy.get('.lemail').type('test@mail.com')
    cy.get('.lpassword').type('wrong')
    cy.get('.login-btn').click()
    cy.url().should('equal','http://localhost:3000/')
  })
})

describe('group chat', () => {

  beforeEach(()=>{
    cy.get('.lemail').type('test@mail.com')
    cy.get('.lpassword').type('test')
    cy.get('.login-btn').click()
  })

  it('when user click send message it shows on the screen next to their username', () => {
    cy.get('#m').type('message')
    cy.get('.send-msg').click()
    //message body
    cy.get('#messages li').last().should('include.text','message')
    //username
    cy.get('#messages').last().should('include.text','test')
    
    
  })
})