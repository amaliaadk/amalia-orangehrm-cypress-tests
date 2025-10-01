describe("API Testing Reqres.in with Cypress", () => {
  it("TC01 - GET List Users", () => {
    cy.request("GET", "https://reqres.in/api/users?page=2").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.have.length(6);
    });
  });

  it("TC02 - GET Single User", () => {
    cy.request("GET", "https://reqres.in/api/users/2").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.id).to.eq(2);
    });
  });

  it("TC03 - GET Single User Not Found", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/23",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  it("TC04 - POST Create User", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: { name: "Amalia", job: "QA Engineer" },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("id");
    });
  });

  it("TC05 - PUT Update User", () => {
    cy.request({
      method: "PUT",
      url: "https://reqres.in/api/users/2",
      body: { name: "Amalia Updated", job: "QA Lead" },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.name).to.eq("Amalia Updated");
    });
  });

  it("TC06 - PATCH Update User", () => {
    cy.request({
      method: "PATCH",
      url: "https://reqres.in/api/users/2",
      body: { job: "Automation Engineer" },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.job).to.eq("Automation Engineer");
    });
  });

  it("TC07 - DELETE User", () => {
    cy.request("DELETE", "https://reqres.in/api/users/2").then((res) => {
      expect(res.status).to.eq(204);
    });
  });

  it("TC08 - POST Register Success", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      body: { email: "eve.holt@reqres.in", password: "pistol" },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");
    });
  });

  it("TC09 - POST Register Failed", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      body: { email: "sydney@fife" },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq("Missing password");
    });
  });

  it("TC10 - POST Login Success", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: { email: "eve.holt@reqres.in", password: "cityslicka" },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");
    });
  });

  it("TC11 - POST Login Failed", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: { email: "peter@klaven" },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq("Missing password");
    });
  });
});

// gtw error semua gapaham.
