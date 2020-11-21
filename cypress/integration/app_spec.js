// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check

describe('Assignment', function () {
  before(() => {
    cy.visit('http://127.0.0.1:8888/')
  })

  it('tests something', () => {
    cy.contains('todos')
  })
})
