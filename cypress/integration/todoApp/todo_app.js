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

  context('No todo', () =>{
    it('Checks there are no todos and everything is showed when firstly opened', () => {
      /**
       * Checks if there are all classes except no todos
       */
      cy.checkTodoLabelExists()
      cy.checkNewTodoInputExists()
      cy.checkFooterLabelExists()
      cy.get('.section').should('not.exist')
    })
  })

  context('Active todo', () =>{
    it('Create one active todo, checks its right showing', () => {
      /**
       * Creates todo and verifies its creation
       */
      cy.createTodo('First todo')
      cy.get('.main').should('exist').contains('First todo')
      cy.get('.todo-list li').should('have.length', 1)

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
      cy.get('.todo-list li').should('have.length', 1)
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
      cy.get('.todo-list li').should('have.length', 0)
      cy.checkTodoCounterLabelCount('1')
      cy.checkTodoLabelExists()
      cy.checkNewTodoInputExists()
      cy.checkFooterLabelExists()
      cy.checkFilterLabelExists()
    })
  })

  context('Selecting todo', () =>{
    it('Selects one todo and checks if its selected', () => {

      cy.setActiveTodo()

      /**
       * Selects todo and sets it completed and verifies its completion
       */
      cy.clickSelectTodo('First active todo')
      cy.get('.main').should('exist')
      cy.get('.completed').contains('First active todo')
      cy.get('.todo-list li').should('have.length', 1)

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
      cy.get('.todo-list li').should('have.length', 0)
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
      cy.get('.todo-list li').should('have.length', 1)
      cy.checkTodoCounterLabelCount('0')
      cy.checkTodoLabelExists()
      cy.checkNewTodoInputExists()
      cy.checkFooterLabelExists()
      cy.checkFilterLabelExists()
      cy.checkClearCompletedButtonExists()
    })

    it('Unselects one todo and checks if its not selected', () => {

      cy.setCompletedTodo()

      /**
       * Selects todo and sets it completed and verifies its completion
       */
      cy.clickSelectTodo('First completed todo')
      cy.get('.main').should('exist')
      cy.get('.main').contains('First completed todo')
      cy.get('.todo-list li').should('have.length', 1)

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
      cy.get('.todo-list li').should('have.length', 1)
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
      cy.get('.todo-list li').should('have.length', 0)
      cy.checkTodoCounterLabelCount('1')
      cy.checkTodoLabelExists()
      cy.checkNewTodoInputExists()
      cy.checkFooterLabelExists()
      cy.checkFilterLabelExists()
    })

    it('Clears one selected todo and checks if its deleted', () => {

      cy.setCompletedTodo()

      /**
       * Clears selected todo and verifies its deletion
       */
      cy.get('.main').should('exist')
      cy.clickClearCompletedButton()
      cy.get('.main').should('not.exist')
      cy.contains('First completed todo').should('not.exist')
      cy.get('.todo-list li').should('have.length', 0)

      /**
       * Verifies classes and counter
       */
      cy.checkTodoLabelExists()
      cy.checkNewTodoInputExists()
      cy.checkFooterLabelExists()
      cy.get('.section').should('not.exist')
    })
  })

  context('Deleted todo', () =>{
    it('Deletes one todo and checks if its not showing', () => {

      cy.setActiveTodo()

      /**
       * Deletes todo and verifies its deletion
       */
      cy.deleteTodo('First active todo')
      cy.get('.main').should('not.exist')
      cy.contains('First active todo').should('not.exist')
      cy.get('.todo-list li').should('have.length', 0)

      /**
       * Verifies classes and counter
       */
      cy.checkTodoLabelExists()
      cy.checkNewTodoInputExists()
      cy.checkFooterLabelExists()
      cy.get('.section').should('not.exist')
    })
  })

  context('Editing todos', () => {
    it('Edits one todo and checks its showing right', () => {

      cy.setActiveTodo()

      /**
       * Edits todo and verifies its creation
       */
      cy.editTodo('First active todo', 'Edited todo')
      cy.get('.main').should('exist').contains('Edited todo')
      cy.get('.todo-list li').should('have.length', 1)

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
      cy.get('.todo-list li').should('have.length', 1)
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
      cy.get('.todo-list li').should('have.length', 0)
      cy.checkTodoCounterLabelCount('1')
      cy.checkTodoLabelExists()
      cy.checkNewTodoInputExists()
      cy.checkFooterLabelExists()
      cy.checkFilterLabelExists()
    })

    it('Cancel editing of one completed todo with escape key', () => {

      cy.setCompletedTodo()

      /**
       * Begin editing todo and verifies editing class
       */
      cy.contains('First completed todo').dblclick()
      cy.get('.editing').contains('First completed todo')
      cy.get('.todo-list li').should('have.length', 1)

      /**
       * Cancels editing todo verifies completed and view class
       */
      cy.get('.editing').type('{esc}')
      cy.get('.completed').get('.view').contains('First completed todo')
      cy.get('.todo-list li').should('have.length', 1)
    })

    it('Deletes one todo after deleting all characters of todo wile editing', () => {

      cy.setCompletedTodo()

      /**
       * Begin editing and clears todo and verifies editing class
       */
      cy.contains('First completed todo').dblclick().focused().clear().type('{enter}')
      cy.get('.editing').should('not.exist')
      cy.contains('First completed todo').should('not.exist')
      cy.get('.todo-list li').should('have.length', 0)
    })
  })

  context('Focus on input', () => {
    it('Default focus on todo input', () => {

      /**
       * Tests input for adding todos is focused
       */
      cy.get('.new-todo').should('be.focused')
    })
  })

  context('Back button', () => {
    it('Redirects to right page after clicking back button', () => {
      cy.setDefaultTodos()

      /**
       * Tests if back button work and shows previous page
       */
      cy.clickActiveButton()
      cy.clickCompletedButton()
      cy.clickAllButton()
      /**
       * Goes back to completed page
       */
      cy.go('back')
      cy.url().should('include', '#/completed')
      cy.contains('Fourth todo completed')
      cy.contains('Fifth todo completed')
      cy.contains('Sixth todo completed')
      cy.get('.todo-list li').should('have.length', 3)

      /**
       * Goes back to Active page
       */
      cy.go('back')
      cy.url().should('include', '#/active')
      cy.contains('First todo active')
      cy.contains('Second todo active')
      cy.contains('Third todo active')
      cy.get('.todo-list li').should('have.length', 3)

      /**
       * Goes back to All page
       */
      cy.go('back')
      cy.url().should('include', '#/')
      cy.contains('First todo active')
      cy.contains('Second todo active')
      cy.contains('Third todo active')
      cy.contains('Fourth todo completed')
      cy.contains('Fifth todo completed')
      cy.contains('Sixth todo completed')
      cy.get('.todo-list li').should('have.length', 6)
    })
  })
  context('Local storage', () => {
    it('Data persists after reloading page', () => {

      /**
       * Tests that local storage isnt deleted after reloading page
       */
      cy.setDefaultTodos()

      /**
       * Checks that todos arent deleted
       */
      cy.contains('First todo active')
      cy.contains('Second todo active')
      cy.contains('Third todo active')
      cy.contains('Fourth todo completed')
      cy.contains('Fifth todo completed')
      cy.contains('Sixth todo completed')
      cy.get('.todo-list li').should('have.length', 6)
      cy.clickActiveButton()
      cy.contains('First todo active')
      cy.contains('Second todo active')
      cy.contains('Third todo active')
      cy.get('.todo-list li').should('have.length', 3)
      cy.clickCompletedButton()
      cy.contains('Fourth todo completed')
      cy.contains('Fifth todo completed')
      cy.contains('Sixth todo completed')
      cy.get('.todo-list li').should('have.length', 3)
    })
  })
})
