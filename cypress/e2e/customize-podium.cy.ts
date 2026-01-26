/// <reference types="cypress" />

describe('Customize Podium Tab', () => {
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

    // Navigate to Customize Podium tab
    cy.contains('.mat-tab-label', 'Customize Podium').click();
  });

  it('should display language dropdown with all 7 languages', () => {
    cy.get('select').first().should('be.visible');

    // Check all language options exist
    const languages = ['Dutch', 'English (UK)', 'English (US)', 'French', 'German (Switzerland)', 'Mexican Spanish', 'Russian'];
    languages.forEach(lang => {
      cy.get('select').first().find('option').should('contain', lang);
    });
  });

  it('should have Load Template button with warning text', () => {
    cy.contains('button', 'Load Template').should('be.visible');
    cy.contains('This will overwrite changes!').should('be.visible');
  });

  it('should have editable certificate template textarea', () => {
    cy.get('textarea').first().should('be.visible');
    cy.get('textarea').first().should('not.be.disabled');

    // Test editability
    cy.get('textarea').first().clear().type('Test template content');
    cy.get('textarea').first().should('have.value', 'Test template content');
  });

  it('should have editable style configuration textarea', () => {
    cy.get('textarea').eq(1).should('be.visible');
    cy.get('textarea').eq(1).should('not.be.disabled');
  });

  it('should have background file input with Clear button', () => {
    cy.get('input[type="file"]').first().should('exist');
    cy.contains('button', 'Clear').first().should('be.visible');
  });

  it('should display background status indicator', () => {
    // Initially should show "No background"
    cy.contains('No background').should('be.visible');
  });

  it('should have orientation dropdown with landscape and portrait options', () => {
    cy.get('select').contains('option', 'Landscape').should('exist');
    cy.get('select').contains('option', 'Portrait').should('exist');
  });

  it('should allow changing orientation', () => {
    // Find the orientation select (contains Landscape/Portrait options)
    cy.get('select').each(($select) => {
      if ($select.find('option[value="landscape"]').length > 0) {
        cy.wrap($select).select('portrait');
        cy.wrap($select).should('have.value', 'portrait');
        cy.wrap($select).select('landscape');
        cy.wrap($select).should('have.value', 'landscape');
      }
    });
  });

  it('should have countries filter input', () => {
    cy.get('input[placeholder*="ISO codes"]').should('be.visible');
    cy.get('input[placeholder*="ISO codes"]').type('IE;GB');
    cy.get('input[placeholder*="ISO codes"]').should('have.value', 'IE;GB');
  });

  it('should have X Offset input', () => {
    cy.get('input[type="number"]').should('exist');
    cy.get('input[type="number"]').first().clear().type('10');
    cy.get('input[type="number"]').first().should('have.value', '10');
  });

  it('should change language when selecting from dropdown', () => {
    cy.get('select').first().select('fr');
    cy.get('select').first().should('have.value', 'fr');
  });
});
