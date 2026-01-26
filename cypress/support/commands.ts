/// <reference types="cypress" />

// Custom commands for WCA Certificates E2E tests

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Select a competition by clicking on it
       */
      selectCompetition(competitionId: string): Chainable<void>;

      /**
       * Navigate to a specific tab in the competition interface
       */
      navigateToTab(tabLabel: string): Chainable<void>;

      /**
       * Wait for the competition data to load
       */
      waitForCompetitionLoad(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('selectCompetition', (competitionId: string) => {
  cy.get('input[placeholder="Enter competition ID"]').clear().type(competitionId);
  cy.contains('button', 'Load').click();
});

Cypress.Commands.add('navigateToTab', (tabLabel: string) => {
  cy.contains('.mat-tab-label', tabLabel).click();
});

Cypress.Commands.add('waitForCompetitionLoad', () => {
  // Wait for loading to disappear and competition interface to appear
  cy.get('.loading-message', { timeout: 15000 }).should('not.exist');
  cy.get('.comp-interface', { timeout: 15000 }).should('be.visible');
});

export {};
