/// <reference types="cypress" />

describe('Competition Selection', () => {
  beforeEach(() => {
    // Intercept the Irish competitions API call (from GitHub raw)
    cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/IE.json', {
      fixture: 'competitions.json'
    }).as('getIrishCompetitions');

    cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/GB.json', {
      fixture: 'competitions-gb.json'
    }).as('getUKCompetitions');

    cy.visit('/');
  });

  it('should display app header with correct title', () => {
    cy.get('h1').should('contain', 'WCA Competition Certificates');
  });

  it('should load and display competitions', () => {
    cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);
    cy.get('.comp-selection').should('be.visible');
    cy.get('h2').should('contain', 'Select Competition');
  });

  it('should display competition categories (In Progress, Upcoming, Completed)', () => {
    cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);
    // Check that category headers can exist (they appear based on competition dates)
    cy.get('.comp-selection').should('be.visible');
    // The actual categories displayed depend on the fixture data relative to current date
    cy.get('.comp-category').should('have.length.at.least', 1);
  });

  it('should navigate to competition view when clicking a competition', () => {
    // Mock the WCIF API response
    cy.intercept('GET', '**/api/v0/competitions/*/wcif/public', {
      fixture: 'wcif.json'
    }).as('getWcif');

    cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

    // Click on a competition button
    cy.get('.competition').first().click();

    cy.wait('@getWcif');

    // Should show the competition interface
    cy.get('.comp-interface', { timeout: 10000 }).should('be.visible');
    cy.get('.comp-title').should('be.visible');
  });

  it('should allow entering custom competition ID', () => {
    cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

    // Check custom competition input exists
    cy.get('input[placeholder="Enter competition ID"]').should('be.visible');
    cy.contains('button', 'Load').should('be.visible');
  });

  it('should load custom competition when ID is entered', () => {
    cy.intercept('GET', '**/api/v0/competitions/CustomComp2024/wcif/public', {
      fixture: 'wcif.json'
    }).as('getCustomWcif');

    cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

    // Enter custom competition ID
    cy.get('input[placeholder="Enter competition ID"]').type('CustomComp2024');
    cy.contains('button', 'Load').click();

    cy.wait('@getCustomWcif');

    // Should show the competition interface
    cy.get('.comp-interface', { timeout: 10000 }).should('be.visible');
  });

  it('should display error message for invalid competition ID', () => {
    cy.intercept('GET', '**/api/v0/competitions/InvalidComp/wcif/public', {
      statusCode: 404,
      body: { error: 'Competition not found' }
    }).as('getInvalidWcif');

    cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

    cy.get('input[placeholder="Enter competition ID"]').type('InvalidComp');
    cy.contains('button', 'Load').click();

    cy.wait('@getInvalidWcif');

    // Should show error message
    cy.get('.error-message', { timeout: 10000 }).should('be.visible');
  });

  it('should display footer links', () => {
    cy.get('.footer').should('be.visible');
    cy.get('.footer a[href*="wiki"]').should('contain', 'Documentation');
    cy.get('.footer a[href*="github.com"]').should('contain', 'Source Code');
  });
});
