describe('weekly menu for existing user', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('displays inputs for login and displays username upon login', () => {
    cy.get('input[name=identifier]').type(Cypress.env('email'));

    cy.get('input[name=password]').type(`${Cypress.env('password')}{enter}`);

    cy.get('h1').should('contain', Cypress.env('username'));
  });

  it('displays 7 recipes', () => {
    cy.get('div[class^=WeeklyMenu]').should('exist');
    cy.get('div[class^=Box]').eq(6).find('h2').should('contain', 'Söndag');
  });
});

describe('user feedback on why there is no menu for new users', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('displays link for registration that takes you to the register page', () => {
    cy.get('div[class*=register]')
      .find('a')
      .should('contain', 'Registrera dig här.');

    cy.get('div[class*=register]').find('a').click();

    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/register');
    });
  });

  it('successfully registers a new user', () => {
    cy.get('input[name=username]').type('test');
    cy.get('input[name=email]').type('test@test.com');
    cy.get('input[name=password]').type('Test123$!');
    cy.get('input[name=confirmPassword]').type('Test123$!');
    cy.get('button[type=submit]').click();

    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/');
    });
  });

  it('tells user to register recipes upon login', () => {
    cy.get('h1').should('contain', 'Ingen meny');
    cy.get('p').should(
      'contain',
      'Du måste lägga in fler recept innan vi kan ge dig din meny.'
    );
  });
});
