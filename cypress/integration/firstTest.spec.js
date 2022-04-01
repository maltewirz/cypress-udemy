/// <reference types="cypress" />

const { table } = require("console");

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

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");
    cy.contains("nb-card", "Basic form")
      .find('[for="exampleInputEmail1"]')
      .should("contain", "Email");
    cy.contains("nb-card", "Basic form")
      .find('[for="exampleInputPassword1"]')
      .should("contain", "Password");

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      // After calling then, the parameter "firstForm" becomes a jquery object, not a cypress object anymore
      // => Different Syntax!
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordSecondText = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordSecondText);

        // change jQuery context back to Cypress using wrap
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("invoke command and assertions", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // 1. Approach with Cypress
    cy.get('[for="exampleInputEmail1"]')
      .should("contain", "Email address")
      // you can use chai jquery syntax
      .should("have.class", "label")
      .should("have.text", "Email address");

    // 2. Approach with then using jquery method
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal("Email address");
      // you can use chai jquery syntax
      expect(label).to.have.class("label");
      expect(label).to.have.text("Email address");
    });

    // 3. Approach with Cypress invoke to get text from input
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      // .should("contain", "checked");  // First possibility to check
      .then((classValue) => {
        // Second possibility to check
        expect(classValue).to.contain("checked");
      });
  });

  it("assert property and choses a date dynamically on calender", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString("default", { month: "short" });
      let dateAssert =
        futureMonth + " " + futureDay + ", " + date.getFullYear();

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click();
          }
        });
      return dateAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(100);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
        // same assertion in chai jquery syntax
        cy.wrap(input).should('have.value', dateAssert)
      });
  });

  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("check boxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
  });

  it("lists and dropdowns", () => {
    cy.visit("/");

    // First Approach
    cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nb-layout-header nav").should("contain", "Dark");
    cy.get("nb-layout-header nav").should(
      "have.css",
      "background-color",
      "rgb(34, 43, 69)"
    );

    // Second Approach
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it("Web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1 Example
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });

    // 2 Example
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Max");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Mueller");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should("contain", "Max");
        cy.wrap(tableColumns).eq(3).should("contain", "Mueller");
      });

    // 3 Example
    const age = [20, 30, 40, 200];
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age === 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it("tooltip", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });

  it("dialog box", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // First way - do not use
    cy.get("tbody tr").first().find(".nb-trash").click();
    cy.on("window.confirm", (confirm) => {
      // If event does not fire, this assert will never execute - bad
      expect(confirm).to.equal("Are you sure you want to delete?");
    });

    // Second way
    const stub = cy.stub();
    cy.on("window:confirm", stub);
    cy.get("tbody tr")
      .first()
      .find(".nb-trash")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Are you sure you want to delete?"
        );
      });

    // Third way
    cy.get("tbody tr").first().find(".nb-trash").click();
    cy.on("window.confirm", () => false);
  });
});
