// type definitions for Cypress object "cy"
/// <reference types="cypress" />
/// http://on.cypress.io/intellisense

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../../support" />

// check this file using TypeScript if available
// @ts-check

describe('localStorage tests', function () {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Data persists after reloading page', () => {

    /**
     * Tests that local storage isnt deleted after reloading page
     */
    cy.fixture('localStorage/react-todos/todos').then((todo) => {
      localStorage.setItem(todo.defaultTodos.key, JSON.stringify(todo.defaultTodos.value))
    })

    cy.reload()
    /**
     * Checks that todos arent deleted
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
