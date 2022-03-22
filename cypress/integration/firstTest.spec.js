/// <reference types="cypress" />

describe("Our second suite", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

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
    cy.get('input[placeholder="Email"]');

    // by two different attributes
    cy.get('[placeholder="Email"][type="email"]');

    // by tag name, attribute with value, id and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    // by data-cy: best practise
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');

    cy.contains("Sign in");

    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    // Find nb-card which contains horizontal form, then find element with attribute type
    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it.only('then and wrap methods', () => {

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      // After calling then, the parameter "firstForm" becomes a jquery object, not a cypress object anymore
      // => Different Syntax!
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(passwordLabelFirst).to.equal(passwordSecondText)

        // change jQuery context back to Cypress using wrap
        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
      })
    })

  })
});
