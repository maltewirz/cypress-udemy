/// <reference types="cypress" />

describe("Our second suite", () => {
  it("first test", () => {
    cy.visit('/')

    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // <input
    //   _ngcontent-beu-c29=""
    //   data-cy="imputEmail1"
    //   fullwidth=""
    //   id="inputEmail1"
    //   nbinput=""
    //   placeholder="Email"
    //   type="email"
    //   ng-reflect-full-width=""
    //   class="input-full-width size-medium shape-rectangle"
    // ></input>;

    // by Tag Name
    cy.get("input");

    // by ID
    cy.get("#inputEmail1");

    // by Class name
    cy.get(".input-full-width");

    // by Attribute name
    cy.get("[placeholder]");

    // by Attribute name and value
    cy.get('[placeholder="Email"]');

    // by Class value (has to be ALL the values, otherwise use class name)
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by Tag name and attribute with value
    cy.get('input[placeholder="Email"]')

    // by two different attributes
    cy.get('[placeholder="Email"][type="email"]')

    // by tag name, attribute with value, id and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    // by data-cy: best practise
    cy.get('[data-cy="imputEmail1"]')

  });
});
