describe('Adding recipes', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('logs in user and visits recipes page', () => {
    cy.get('input[name=identifier]').type(Cypress.env('email'));
    cy.get('input[name=password]').type(`${Cypress.env('password')}{enter}`);

    cy.get('a').contains('Dina recept').click();

    cy.get('h1').should('contain', 'Dina recept');
  });

  it('shows a form for adding recipes, providing proper feedback to the user for required fields', () => {
    cy.get('button[type=button]').contains('Lägg till recept').click();
    cy.get('form').find('button').contains('Spara recept').click();

    cy.get('input[name=name]')
      .next('span')
      .should('contain', 'Namn på receptet måste innehålla minst 3 tecken.');
    cy.get('input[name=servings]')
      .next('span')
      .should('contain', 'Antal portioner måste vara minst 1.');
    cy.get('textarea[name=description]')
      .next('span')
      .should('contain', 'Du måste fylla i en beskrivning.');
    cy.get('input[id=ingredientName0]')
      .next('span')
      .should(
        'contain',
        'Namn på ingrediensen måste innehålla minst 2 tecken.'
      );
    cy.get('div[class^=CategoryOptions]')
      .next('span')
      .should('contain', 'Du måste välja en kategori.');
    cy.get('input[id=amount0]')
      .next('span')
      .should(
        'contain',
        'En giltig siffra måste vara ifylld som är över 0, decimaltal accepteras också (exempelvis 0.5).'
      );
    cy.get('div[class^=MetricOptions]')
      .next('span')
      .should('contain', 'Du måste välja en enhet.');
  });

  it('adds a new recipe', () => {
    cy.get('input[name=name]').type('Placeholder recipe');
    cy.get('input[name=servings]').type('2');
    cy.get('textarea[name=description]').type('Placeholder description');
    cy.get('input[id=ingredientName0]').type('Placeholder inrgedient');
    cy.get('input[id=Fryst0]').check({ force: true });
    cy.get('input[id=amount0]').type('50');
    cy.get('input[id=g0]').check({ force: true });

    cy.get('form').find('button').contains('Spara recept').click();

    cy.get('h2').should('contain', 'Receptet är tillagt!');
    cy.get('button').contains('Mina recept');
  });

  it('displays new recipe in the recipe list', () => {
    cy.get('button').contains('Mina recept').click();
    cy.get('h2:contains("Placeholder recipe")').should('exist');
  });
});
