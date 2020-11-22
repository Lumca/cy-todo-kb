// type definitions for Cypress object "cy"
/// <reference types="cypress" />
/// http://on.cypress.io/intellisense

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../../support" />

// check this file using TypeScript if available
// @ts-check

describe('Browser resolution tests', function () {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Resolution tests 1920x1080', () => {

    /**
     * Sets Full HD resolution
     */
    cy.viewport(1920, 1080)
    /**
     * Sets data for testing
     */
    cy.fixture('localStorage/react-todos/todos').then((todo) => {
      localStorage.setItem(todo.defaultTodos.key, JSON.stringify(todo.defaultTodos.value))
    })

    /**
     * Checks data are being shown
     */
    cy.contains('First todo active')
    cy.contains('Second todo active')
    cy.contains('Third todo active')
    cy.clickActiveButton()
    cy.contains('First todo active')
    cy.contains('Second todo active')
    cy.contains('Third todo active')
    cy.clickCompletedButton()
    cy.contains('Fourth todo completed')
    cy.contains('Fifth todo completed')
    cy.contains('Sixth todo completed')
  })
})
