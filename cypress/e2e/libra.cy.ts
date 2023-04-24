describe('Pagepals', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3001/');
  })

  it('loads login', () => {
    cy.contains('Welcome');
    cy.contains('Enter Your Credentials To Login');
  });

  it('login form can be clicked', function () {
    cy.contains('Login').click()
  });
  it('user can login', function() {
    cy.contains('Login').click()
    cy.get('input:first').type('jdoe@email.com')
    cy.get('input:last').type('1234567')
  })
});
