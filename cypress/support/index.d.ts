/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Creates one Todo using UI
         * @example
         * cy.createTodo('new todo')
         */
        createTodo(createTodo: string): Chainable<any>

        /**
         * Selects specific Todo item via UI
         * @example
         * cy.clickSelectTodo('todo')
         */
        clickSelectTodo(selectTodo: string): Chainable<any>

        /**
         * Edits todo via UI
         * @example
         * cy.editTodo('current todo', 'edited todo')
         */
        editTodo(currentTodo: string, editTodo: string): Chainable<any>

        /**
         * Deletes todo via UI
         * @example
         * cy.deleteTodo('todo')
         */
        deleteTodo(deleteTodo: string): Chainable<any>

        /**
         * Click All button todo via UI
         * @example
         * cy.clickAllButton()
         */
        clickAllButton(): Chainable<any>

        /**
         * Click Active button todo via UI
         * @example
         * cy.clickActiveButton()
         */
        clickActiveButton(): Chainable<any>

        /**
         * Click Completed button todo via UI
         * @example
         * cy.clickCompletedButton()
         */
        clickCompletedButton(): Chainable<any>

        /**
         * Click Clear completed button todo via UI
         * @example
         * cy.clickClearCompletedButton()
         */
        clickClearCompletedButton(): Chainable<any>

        /**
         * checks todo label exists
         * @example
         * cy.checkTodoLabelExists()
         */
        checkTodoLabelExists(): Chainable<any>

        /**
         * checks new todo input exists
         * @example
         * cy.checkNewTodoInputExists()
         */
        checkNewTodoInputExists(): Chainable<any>

        /**
         * checks footer label exists
         * @example
         * cy.checkFooterLabelExists()
         */
        checkFooterLabelExists(): Chainable<any>

        /**
         * checks Filters buttons exists
         * @example
         * cy.checkFooterLabelExists()
         */
        checkFilterLabelExists(): Chainable<any>

        /**
         * check Clear Completed Button Exists
         * @example
         * cy.checkClearCompletedButtonExists()
         */
        checkClearCompletedButtonExists(): Chainable<any>

        /**
         * Check todo counter exists with right count
         * @example
         * cy.checkTodoCounterLabelCount()
         */
        checkTodoCounterLabelCount(count: string): Chainable<any>

        /**
         * Sets app with active todo
         * @example
         * cy.setActiveTodo()
         */
        setActiveTodo(): Chainable<any>

        /**
         * Sets app with completed todo
         * @example
         * cy.setCompletedTodo()
         */
        setCompletedTodo(): Chainable<any>

        /**
         * Sets app with default todos
         * @example
         * cy.setActiveTodo()
         */
        setDefaultTodos(): Chainable<any>
    }
}
