// type definitions for Cypress object "cy"
/// <reference types="cypress" />
/// http://on.cypress.io/intellisense

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../../support" />

// check this file using TypeScript if available
// @ts-check

describe('E2E tests todo app', function () {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Load page, check there are no todos', () => {
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.get('.section').should('not.exist')

    cy.createTodo('First todo')
    cy.clickSelectTodo('First todo')
    cy.editTodo('First todo', 'Edited Todo')
    cy.clickSelectTodo('Edited Todo')
    cy.deleteTodo('Edited Todo')
  })

  it('Create active todo, checks its right showing', () => {
    /**
     * Creates todo and verifies its creation
     */
    cy.createTodo('First todo')
    cy.get('.main').should('exist').contains('First todo')

    /**
     * Verifies classes and counter in All page
     */
    cy.checkTodoCounterLabelCount('1')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()

    /**
     * Goes to Active page and verifies todo, classes and counter
     */
    cy.clickActiveButton()
    cy.get('.main').should('exist').contains('First todo')
    cy.checkTodoCounterLabelCount('1')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()

    /**
     * Goes to Completed page and verifies todo, classes and counter
     */
    cy.clickCompletedButton()
    cy.contains('First todo').should('not.be.visible')
    cy.checkTodoCounterLabelCount('1')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()
  })

  it('Edits it and checks its showing right', () => {

    cy.fixture('localStorage/react-todos/todos').then((todo) => {
      localStorage.setItem(todo.activeTodo.key, JSON.stringify(todo.activeTodo.value))
    })

    /**
     * Edits todo and verifies its creation
     */
    cy.editTodo('First active todo', 'Edited todo')
    cy.get('.main').should('exist').contains('Edited todo')

    /**
     * Verifies classes and counter in All page
     */
    cy.checkTodoCounterLabelCount('1')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()

    /**
     * Goes to Active page and verifies todo, classes and counter
     */
    cy.clickActiveButton()
    cy.get('.main').should('exist').contains('Edited todo')
    cy.checkTodoCounterLabelCount('1')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()

    /**
     * Goes to Completed page and verifies todo, classes and counter
     */
    cy.clickCompletedButton()
    cy.contains('Edited todo').should('not.be.visible')
    cy.checkTodoCounterLabelCount('1')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()
  })

  it('Deletes todo and checks if its not showing', () => {

    cy.fixture('localStorage/react-todos/todos').then((todo) => {
      localStorage.setItem(todo.activeTodo.key, JSON.stringify(todo.activeTodo.value))
    })

    /**
     * Deletes todo and verifies its deletion
     */
    cy.deleteTodo('First active todo')
    cy.get('.main').should('not.exist')
    cy.contains('First active todo').should('not.exist')

    /**
     * Verifies classes and counter
     */
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.get('.section').should('not.exist')
  })

  it('Selects todo and checks if its selected', () => {

    cy.fixture('localStorage/react-todos/todos').then((todo) => {
      localStorage.setItem(todo.activeTodo.key, JSON.stringify(todo.activeTodo.value))
    })

    /**
     * Selects todo and sets it completed and verifies its completion
     */
    cy.clickSelectTodo('First active todo')
    cy.get('.main').should('exist')
    cy.get('.completed').contains('First active todo')

    /**
     * Verifies classes and counter in All page
     */
    cy.checkTodoCounterLabelCount('0')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()
    cy.checkClearCompletedButtonExists()

    /**
     * Goes to Active page and verifies todo, classes and counter
     */
    cy.clickActiveButton()
    cy.contains('First active todo').should('not.be.visible')
    cy.checkTodoCounterLabelCount('0')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()
    cy.checkClearCompletedButtonExists()

    /**
     * Goes to Completed page and verifies todo, classes and counter
     */
    cy.clickCompletedButton()
    cy.get('.main').should('be.visible')
    cy.contains('First active todo').should('be.visible')
    cy.checkTodoCounterLabelCount('0')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()
    cy.checkClearCompletedButtonExists()
  })

  it('Unselects todo and checks if its not selected', () => {

    cy.fixture('localStorage/react-todos/todos').then((todo) => {
      localStorage.setItem(todo.completedTodo.key, JSON.stringify(todo.completedTodo.value))
    })

    /**
     * Selects todo and sets it completed and verifies its completion
     */
    cy.clickSelectTodo('First completed todo')
    cy.get('.main').should('exist')
    cy.get('.main').contains('First completed todo')

    /**
     * Verifies classes and counter in All page
     */
    cy.checkTodoCounterLabelCount('1')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()

    /**
     * Goes to Active page and verifies todo, classes and counter
     */
    cy.clickActiveButton()
    cy.contains('First completed todo').should('be.visible')
    cy.checkTodoCounterLabelCount('1')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()

    /**
     * Goes to Completed page and verifies todo, classes and counter
     */
    cy.clickCompletedButton()
    cy.get('.main').should('be.visible')
    cy.contains('First completed todo').should('not.be.visible')
    cy.checkTodoCounterLabelCount('1')
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.checkFilterLabelExists()
  })

  it('Clears selected todo and checks if its not selected', () => {

    cy.fixture('localStorage/react-todos/todos').then((todo) => {
      localStorage.setItem(todo.completedTodo.key, JSON.stringify(todo.completedTodo.value))
    })

    /**
     * Clears selected todo and verifies its deletion
     */
    cy.get('.main').should('exist')
    cy.clickClearCompletedButton('First completed todo')
    cy.get('.main').should('not.exist')
    cy.contains('First completed todo').should('not.exist')

    /**
     * Verifies classes and counter
     */
    cy.checkTodoLabelExists()
    cy.checkNewTodoInputExists()
    cy.checkFooterLabelExists()
    cy.get('.section').should('not.exist')
  })

  it('Cancel editing completed todo', () => {

    cy.fixture('localStorage/react-todos/todos').then((todo) => {
      localStorage.setItem(todo.completedTodo.key, JSON.stringify(todo.completedTodo.value))
    })

    /**
     * Begin editing todo and verifies editing class
     */
    cy.contains('First completed todo').dblclick()
    cy.get('.editing').contains('First completed todo')

    /**
     * Cancels editing todo verifies completed and view class
     */
    cy.get('.editing').type('{esc}')
    cy.get('.completed').get('.view').contains('First completed todo')
  })

  it('Focus on todo input', () => {

    /**
     * Tests input for adding todos is focused
     */
    cy.get('.new-todo').should('be.focused')
  })
})
