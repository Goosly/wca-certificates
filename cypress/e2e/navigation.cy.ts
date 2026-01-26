/// <reference types="cypress" />

describe('Navigation & Error States', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/IE.json', {
      fixture: 'competitions.json'
    }).as('getIrishCompetitions');

    cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/GB.json', {
      fixture: 'competitions-gb.json'
    }).as('getUKCompetitions');

    cy.intercept('GET', '**/api/v0/competitions/*/wcif/public', {
      fixture: 'wcif.json'
    }).as('getWcif');
  });

  describe('Tab Navigation', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

      // Select a competition
      cy.get('.competition').first().click();
      cy.wait('@getWcif');
      cy.get('.comp-interface', { timeout: 10000 }).should('be.visible');
    });

    it('should navigate to Podium Certificates tab', () => {
      cy.contains('.mat-tab-label', 'Podium Certificates').click();
      cy.get('.events-table').should('be.visible');
    });

    it('should navigate to Customize Podium tab', () => {
      cy.contains('.mat-tab-label', 'Customize Podium').click();
      cy.contains('Language').should('be.visible');
      cy.contains('Certificate Template').should('be.visible');
    });

    it('should navigate to Participation Certificates tab', () => {
      cy.contains('.mat-tab-label', 'Participation Certificates').click();
      cy.contains('Total Competitors').should('be.visible');
    });

    it('should navigate to Customize Participation tab', () => {
      cy.contains('.mat-tab-label', 'Customize Participation').click();
      cy.contains('Language').should('be.visible');
    });

    it('should allow navigating between all tabs', () => {
      // Navigate through all tabs
      cy.contains('.mat-tab-label', 'Podium Certificates').click();
      cy.get('.events-table').should('be.visible');

      cy.contains('.mat-tab-label', 'Customize Podium').click();
      cy.contains('Certificate Template').should('be.visible');

      cy.contains('.mat-tab-label', 'Participation Certificates').click();
      cy.contains('Total Competitors').should('be.visible');

      cy.contains('.mat-tab-label', 'Customize Participation').click();
      cy.get('textarea').should('be.visible');

      // Go back to first tab
      cy.contains('.mat-tab-label', 'Podium Certificates').click();
      cy.get('.events-table').should('be.visible');
    });
  });

  describe('Loading State', () => {
    it('should display loading state when fetching competitions', () => {
      // Delay the response to see loading state
      cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/IE.json', {
        fixture: 'competitions.json',
        delay: 1000
      }).as('getIrishCompetitionsDelayed');

      cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/GB.json', {
        fixture: 'competitions-gb.json',
        delay: 1000
      }).as('getUKCompetitionsDelayed');

      cy.visit('/');

      // Should show loading or competitions list
      cy.get('.comp-selection').should('be.visible');
    });

    it('should display loading message when fetching WCIF', () => {
      cy.intercept('GET', '**/api/v0/competitions/*/wcif/public', {
        fixture: 'wcif.json',
        delay: 1000
      }).as('getWcifDelayed');

      cy.visit('/');
      cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

      cy.get('.competition').first().click();

      // Should show loading message
      cy.get('.loading-message').should('be.visible');

      cy.wait('@getWcifDelayed');
      cy.get('.loading-message').should('not.exist');
    });
  });

  describe('Error States', () => {
    it('should display error message when API call fails', () => {
      cy.intercept('GET', '**/api/v0/competitions/*/wcif/public', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      }).as('getWcifError');

      cy.visit('/');
      cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

      cy.get('.competition').first().click();
      cy.wait('@getWcifError');

      // Should show error message
      cy.get('.error-message').should('be.visible');
    });

    it('should display error for non-existent competition', () => {
      cy.intercept('GET', '**/api/v0/competitions/NonExistent/wcif/public', {
        statusCode: 404,
        body: { error: 'Competition not found' }
      }).as('getWcifNotFound');

      cy.visit('/');
      cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

      cy.get('input[placeholder="Enter competition ID"]').type('NonExistent');
      cy.contains('button', 'Load').click();

      cy.wait('@getWcifNotFound');
      cy.get('.error-message').should('be.visible');
    });
  });

  describe('Competition Header', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

      cy.get('.competition').first().click();
      cy.wait('@getWcif');
      cy.get('.comp-interface', { timeout: 10000 }).should('be.visible');
    });

    it('should display competition title', () => {
      cy.get('.comp-title').should('be.visible');
    });

    it('should display event count and competitor count', () => {
      cy.get('.comp-header').should('contain', 'events');
      cy.get('.comp-header').should('contain', 'competitors');
    });

    it('should have action buttons in header', () => {
      cy.contains('button', 'Refresh Data').should('be.visible');
      cy.contains('button', 'Empty Certificate').should('be.visible');
    });
  });
});
