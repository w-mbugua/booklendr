describe('Pagepals', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:4000/testing/reset');
    cy.visit('http://localhost:3000/register');
    cy.get('#username').type('User One');
    cy.get('#email').type('user1@gmail.com');
    cy.get('#phoneNumber').type('0708200200');
    cy.get('#password').type('pass123');
    cy.get('#register-btn').click();
  });

  describe('login', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000/');
    });

    it('loads login', function () {
      cy.contains('Welcome');
      cy.contains('Enter Your Credentials To Login');
    });

    it('login form can be clicked', function () {
      cy.contains('Login').click();
    });

    it('user can login', function () {
      cy.contains('Login').click();
      cy.get('#username').type('user1@gmail.com');
      cy.get('#password').type('pass123');
      cy.get('#login-btn').click();

      cy.contains('Welcome, User One');
    });
  });

  describe('a book exists', function () {
    beforeEach(function () {
      cy.contains('New Book').click();
    });

    it('should display error if any field is empty', function () {
      cy.get('#book-title').type('test book')
      cy.get('#new-book-btn').click()

      cy.get('#author-error').should('contain.text', 'Author is required')
      cy.get('#tag-error').should('contain.text', 'Book category is required')
    })

    it('a new book can be added', function () {
      cy.get('#book-title').type('the pragmatic programmer')
      cy.get('#author').type('andrew hunt')
      cy.get('#tag').type('software engineering')
      cy.get('#new-book-btn').click()
      cy.get('#book-post').contains('The Pragmatic Programmer');
      cy.get('#book-post').contains('View More').click();
    });
  });
});
