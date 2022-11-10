Cypress.Commands.add('checkInputExistEmpty', () => {
  const cyInput = cy.get('#inpTodoTitle');
  cyInput.should('exist').should('be.visible');
  cyInput.should('contain.text', '');
});
