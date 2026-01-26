/// <reference types="cypress" />

describe('Participation Certificates Tab', () => {
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

    // Navigate to Participation Certificates tab
    cy.contains('.mat-tab-label', 'Participation Certificates').click();
  });

  it('should display participant stats', () => {
    // Check stats display
    cy.contains('Total Competitors').should('be.visible');
    cy.contains('With Results').should('be.visible');
    cy.contains('No Results').should('be.visible');
  });

  it('should show correct total competitors count', () => {
    // Based on fixture: 4 accepted persons
    cy.contains('Total Competitors').parent().should('contain', '4');
  });

  it('should show competitors with results count', () => {
    cy.contains('With Results').parent().find('div').should('exist');
  });

  it('should have Download PDF button', () => {
    cy.contains('button', 'Certificates (PDF)').should('be.visible');
  });

  it('should have Download ZIP button', () => {
    cy.contains('button', 'Certificates (ZIP)').should('be.visible');
  });

  it('should enable download buttons when there are results', () => {
    // Based on fixture data, there should be participants with results
    cy.contains('button', 'Certificates (PDF)').should('not.be.disabled');
    cy.contains('button', 'Certificates (ZIP)').should('not.be.disabled');
  });

  it('should display generation note', () => {
    cy.contains('Generation may take a few seconds').should('be.visible');
  });
});

describe('Participation Certificates Tab - No Results', () => {
  beforeEach(() => {
    // Create a WCIF with no results
    const wcifNoResults = {
      formatVersion: '1.0',
      id: 'TestCompetition2024',
      name: 'Test Competition 2024',
      shortName: 'Test 2024',
      persons: [
        {
          registrantId: 1,
          name: 'John Doe',
          wcaId: '2015DOEJ01',
          countryIso2: 'IE',
          registration: {
            wcaRegistrationId: 123,
            eventIds: ['333'],
            status: 'accepted'
          }
        }
      ],
      events: [
        {
          id: '333',
          rounds: [
            {
              id: '333-r1',
              format: 'a',
              results: []
            }
          ]
        }
      ],
      schedule: {
        startDate: '2024-06-15',
        numberOfDays: 2,
        venues: []
      }
    };

    cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/IE.json', {
      fixture: 'competitions.json'
    }).as('getIrishCompetitions');

    cy.intercept('GET', '**/speedcubing-ireland/wca-analysis/api/competitions/GB.json', {
      fixture: 'competitions-gb.json'
    }).as('getUKCompetitions');

    cy.intercept('GET', '**/api/v0/competitions/*/wcif/public', {
      body: wcifNoResults
    }).as('getWcif');

    cy.visit('/');
    cy.wait(['@getIrishCompetitions', '@getUKCompetitions']);

    cy.get('.competition').first().click();
    cy.wait('@getWcif');
    cy.get('.comp-interface', { timeout: 10000 }).should('be.visible');

    cy.contains('.mat-tab-label', 'Participation Certificates').click();
  });

  it('should disable download buttons when no results', () => {
    cy.contains('button', 'Certificates (PDF)').should('be.disabled');
    cy.contains('button', 'Certificates (ZIP)').should('be.disabled');
  });

  it('should show 0 for With Results', () => {
    cy.contains('With Results').parent().should('contain', '0');
  });
});
