/// <reference types="cypress" />

describe('Customize Participation Tab', () => {
  beforeEach(() => {
    // Intercept API calls (from GitHub raw)
    cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/IE.json', {
      fixture: 'competitions.json'
    }).as('getIrishCompetitions');

    cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/GB.json', {
      fixture: 'competitions-gb.json'
    }).as('getUKCompetitions');

    cy.intercept('GET', '**/api/v0/competitions/*/wcif/public', {
      fixture: 'wcif.json'
    }).as('getWcif');

    cy.visit('/');
    cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

    // Select a competition
    cy.get('.competition').first().click();
    cy.wait('@getWcif');
    cy.get('.comp-interface', { timeout: 10000 }).should('be.visible');

    // Navigate to Customize Participation tab
    cy.contains('.mat-tab-label', 'Customize Participation').click();
  });

  it('should display language dropdown', () => {
    cy.get('select').first().should('be.visible');
  });

  it('should have all language options', () => {
    const languages = ['Dutch', 'English (UK)', 'English (US)', 'German (Switzerland)', 'Mexican Spanish', 'Russian'];
    languages.forEach(lang => {
      cy.get('select').first().find('option').should('contain', lang);
    });
  });

  it('should have Load Template button with warning', () => {
    cy.contains('button', 'Load Template').should('be.visible');
    cy.contains('This will overwrite changes!').should('be.visible');
  });

  it('should have editable template textarea', () => {
    cy.get('textarea').should('be.visible');
    cy.get('textarea').should('not.be.disabled');

    // Test editability
    cy.get('textarea').clear().type('Test participation template');
    cy.get('textarea').should('have.value', 'Test participation template');
  });

  it('should have background file upload', () => {
    cy.get('input[type="file"]').should('exist');
    cy.contains('button', 'Clear').should('be.visible');
  });

  it('should display background status', () => {
    cy.contains('No background').should('be.visible');
  });

  it('should have orientation dropdown', () => {
    cy.get('select').contains('option', 'Landscape').should('exist');
    cy.get('select').contains('option', 'Portrait').should('exist');
  });

  it('should allow changing orientation', () => {
    cy.get('select').each(($select) => {
      if ($select.find('option[value="landscape"]').length > 0) {
        cy.wrap($select).select('portrait');
        cy.wrap($select).should('have.value', 'portrait');
      }
    });
  });

  it('should have X Offset input', () => {
    cy.get('input[type="number"]').should('exist');
    cy.get('input[type="number"]').first().clear().type('15');
    cy.get('input[type="number"]').first().should('have.value', '15');
  });

  it('should change language when selected', () => {
    cy.get('select').first().select('nl');
    cy.get('select').first().should('have.value', 'nl');
  });
});
