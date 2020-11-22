// ***********************************************
// This example commands.js shows you how to
// create the custom commands: 'createDefaultTodos'
// and 'createTodo'.
//
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/commands
// ***********************************************
/**
 * Commands for handling todos
 */

Cypress.Commands.add('createTodo', (todoName) => {
  cy.get('.new-todo').type(`${todoName}{enter}`)
})

Cypress.Commands.add('clickSelectTodo', (todoName) => {
  cy.contains(todoName).siblings('.toggle').click()
})

Cypress.Commands.add('editTodo', (todoName, editTodoName) => {
  cy.contains(todoName).dblclick().focused().clear()
  cy.get('.editing').type(`${editTodoName}{enter}`)
})

Cypress.Commands.add('deleteTodo', (todoName) => {
  cy.contains(todoName).siblings('.destroy').invoke('show').click()
})

/**
 * Commands for handling menu buttons
 */

Cypress.Commands.add('clickAllButton', () => {
  cy.get('[href="#/"]').click()
  cy.url().should('include', '#/')
})

Cypress.Commands.add('clickActiveButton', () => {
  cy.get('[href="#/active"]').click()
  cy.url().should('include', '#/active')
})

Cypress.Commands.add('clickCompletedButton', () => {
  cy.get('[href="#/completed"]').click()
  cy.url().should('include', '#/completed')
})

Cypress.Commands.add('clickClearCompletedButton', () => {
  cy.get('.clear-completed').click()
})

/**
 * Commands for checking classes and labels
 */

Cypress.Commands.add('checkTodoLabelExists', () => {
  cy.get('.header').should('exist').contains('todos')
})

Cypress.Commands.add('checkNewTodoInputExists', () => {
  cy.get('.new-todo').should('have.attr', 'placeholder', 'What needs to be done?')
})

Cypress.Commands.add('checkFooterLabelExists', () => {
  cy.get('.info').should('exist')
  cy.get('.info').contains('Double-click to edit a todo')
  cy.get('.info').contains('Created by')
  cy.get('.info').contains('petehunt')
  cy.get('.info').contains('Part of TodoMVC')
})

Cypress.Commands.add('checkFilterLabelExists', () => {
  cy.get('.filters').should('exist')
  cy.get('.filters').contains('All')
  cy.get('.filters').contains('Active')
  cy.get('.filters').contains('Completed')
})

Cypress.Commands.add('checkClearCompletedButtonExists', () => {
  cy.get('.clear-completed').should('exist')
  cy.get('.clear-completed').contains('Clear completed')
})

Cypress.Commands.add('checkTodoCounterLabelCount', (count) => {
  cy.get('.todo-count').should('exist')
  if (count === '1') {
    cy.get('.todo-count').contains(count)
    cy.get('.todo-count').contains('item')
    cy.get('.todo-count').contains('left')
  }

  if (count !== '1') {
    cy.get('.todo-count').contains(count)
    cy.get('.todo-count').contains('items')
    cy.get('.todo-count').contains('left')
  }
})
