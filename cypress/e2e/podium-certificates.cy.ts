/// <reference types="cypress" />

describe('Podium Certificates Tab', () => {
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

    // Intercept logging calls
    cy.intercept('POST', '**/inputs/*', { statusCode: 200 }).as('logEvent');

    cy.visit('/');
    cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

    // Select a competition
    cy.get('.competition').first().click();
    cy.wait('@getWcif');
    cy.get('.comp-interface', { timeout: 10000 }).should('be.visible');
  });

  it('should display the events table', () => {
    cy.get('.events-table').should('be.visible');
    cy.get('.events-table thead').should('contain', 'Print');
    cy.get('.events-table thead').should('contain', 'Event');
    cy.get('.events-table thead').should('contain', 'Status');
  });

  it('should display events with checkboxes', () => {
    cy.get('.events-table tbody tr').should('have.length.at.least', 1);
    cy.get('.event-checkbox').should('have.length.at.least', 1);
  });

  it('should toggle event selection when clicking checkbox', () => {
    cy.get('.event-checkbox').first().should('not.be.checked');
    cy.get('.event-checkbox').first().click();
    cy.get('.event-checkbox').first().should('be.checked');
    cy.get('.event-checkbox').first().click();
    cy.get('.event-checkbox').first().should('not.be.checked');
  });

  it('should toggle event selection when clicking row', () => {
    cy.get('.event-row').first().should('not.have.class', 'selected');
    cy.get('.event-row').first().click();
    cy.get('.event-row').first().should('have.class', 'selected');
    cy.get('.event-checkbox').first().should('be.checked');
  });

  it('should have Download PDF button disabled when no events selected', () => {
    cy.contains('button', 'Download PDF').should('be.disabled');
  });

  it('should enable Download PDF button when event is selected', () => {
    cy.get('.event-checkbox').first().click();
    cy.contains('button', 'Download PDF').should('not.be.disabled');
  });

  it('should have Download ZIP button', () => {
    cy.contains('button', 'Download ZIP').should('be.visible');
  });

  it('should have Preview button', () => {
    cy.contains('button', 'Preview').should('be.visible');
  });

  it('should have Refresh Data button', () => {
    cy.contains('button', 'Refresh Data').should('be.visible');
  });

  it('should have Empty Certificate button', () => {
    cy.contains('button', 'Empty Certificate').should('be.visible');
  });

  it('should refresh data when clicking Refresh Data button', () => {
    // Add delay to see refreshing state
    cy.intercept('GET', '**/api/v0/competitions/*/wcif/public', {
      fixture: 'wcif.json',
      delay: 500
    }).as('getWcifDelayed');

    cy.contains('button', 'Refresh Data').click();

    // Should show refreshing state
    cy.get('.status-refreshing').should('be.visible');

    // Wait for refresh to complete
    cy.wait('@getWcifDelayed');
    cy.get('.status-refreshing', { timeout: 10000 }).should('not.exist');
  });

  it('should display event status/warnings', () => {
    // Check that the Status column has content
    cy.get('.event-row').each(($row) => {
      cy.wrap($row).find('.event-warning').should('exist');
    });
  });
});
