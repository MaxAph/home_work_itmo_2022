describe('empty spec', () => {
  before(() => {
    cy.visit('http://localhost:8888');
  });

  it('enter todo text as number and check disabled button', () => {
    cy.get('#inpTodoTitle').type(123);
    cy.get('#btnCreateTodo').should('be.disabled');
    cy.get('#inpTodoTitle').clear();
  });

  it('goto index page enter todo text and press create', () => {
    const TEST_TODO_TEXT = 'New Todo';

    cy.checkInputExistEmpty();

    cy.get('body').then(() => {});
    cy.get('#inpTodoTitle').type(TEST_TODO_TEXT);
    cy.get('#btnCreateTodo').click();

    cy.checkInputExistEmpty();

    const todoListChildren = cy.get('#listOfTodos').children();

    todoListChildren.should('exist').should('have.length', 1);
    todoListChildren.first().should('contain.text', TEST_TODO_TEXT);

    const checkChildren = () =>
      cy
        .get('#listOfTodos > li > input[type="checkbox"]')
        .should('exist')
        .should('have.length', 1);

    checkChildren();

    cy.reload(true);

    checkChildren();
  });
});
