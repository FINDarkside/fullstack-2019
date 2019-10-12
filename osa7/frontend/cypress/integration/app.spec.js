
function login() {
  cy.visit('http://localhost:3003')
  cy.get('input[name="username"]')
    .type('TestUser');
  cy.get('input[name="password"]')
    .type('pass');
  cy.get('button')
    .contains('Login')
    .click();
}

describe('App ', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/reset')
  })

  it('Shows login page when not logged in', function () {
    cy.visit('http://localhost:3003')
    cy.get('form')
      .contains('Login');
  })

  it('Login works', function () {
    login();
    cy.contains('logged in');
  })

  it('Can create new blog', function () {
    login();
    cy.contains('button', 'Create blog').click();
    cy.get('input[placeholder="Title"]')
      .type('asjho8u09qasd');
    cy.get('input[placeholder="Author"]')
      .type('Minä tietnkin');
    cy.get('input[placeholder="Url"]')
      .type('www.test.com');
    cy.get('button')
      .contains('Submit')
      .click();
    cy.get('a')
      .contains('asjho8u09qasd');
  })

  it('Can like blog', function () {
    login();
    cy.visit('http://localhost:3003/blogs/5a422aa71b54a676234d17f8');
    cy.contains('5 likes');
    cy.contains('button', 'like').click();
    cy.contains('6 likes');
  })

  it('Can add comment', function () {
    login();
    cy.visit('http://localhost:3003/blogs/5a422aa71b54a676234d17f8');
    cy.contains('Comments');
    cy.get('input').type('AASdoiuo872asd');
    cy.contains('button', 'Add comment').click();
    cy.contains('li', 'AASdoiuo872asd');
  })

  it('Can logout', function () {
    login();
    cy.contains('button', 'Log out').click();
    cy.contains('form', 'Login');
  })
})
