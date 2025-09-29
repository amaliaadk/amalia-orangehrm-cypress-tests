const usernameXpath = "//input[@name='username']";
const passwordXpath = "//input[@name='password']";
const submitBtnXpath = "//button[@type='submit']";

describe("OrangeHRM - Login Test Suite with Intercept", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  it("TC_001 - Login sukses dengan username & password valid", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginReq");

    cy.xpath(usernameXpath).type("Admin");
    cy.xpath(passwordXpath).type("admin123");
    cy.xpath(submitBtnXpath).click();

    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/dashboard");
    cy.xpath("//h6[text()='Dashboard']").should("be.visible");
  });

  it("TC_002 - Login gagal dengan password salah", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginReq");

    cy.xpath(usernameXpath).type("Admin");
    cy.xpath(passwordXpath).type("admin1234");
    cy.xpath(submitBtnXpath).click();

    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_003 - Login gagal dengan username salah", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginReq");

    cy.xpath(usernameXpath).type("AdmiN");
    cy.xpath(passwordXpath).type("admin1234");
    cy.xpath(submitBtnXpath).click();

    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_004 - Login gagal dengan username kosong", () => {
    cy.xpath(passwordXpath).type("admin123");
    cy.xpath(submitBtnXpath).click();

    // Tidak ada request dikirim → validasi UI saja
    cy.contains("Required").should("exist");
  });

  it("TC_005 - Login gagal dengan password kosong", () => {
    cy.xpath(usernameXpath).type("Admin");
    cy.xpath(submitBtnXpath).click();

    // Tidak ada request dikirim → validasi UI saja
    cy.contains("Required").should("exist");
  });

  it("TC_006 - Login gagal dengan username & password kosong", () => {
    cy.xpath(submitBtnXpath).click();

    // Tidak ada request dikirim → validasi UI saja
    cy.contains("Required").should("exist");
  });

  it("TC_007 - Login sukses dengan menekan Enter (shortcut)", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginReq");

    cy.xpath(usernameXpath).type("Admin");
    cy.xpath(passwordXpath).type("admin123{enter}");

    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/dashboard");
  });

  it("TC_008 - Login gagal dengan input spasi saja", () => {
    cy.xpath(usernameXpath).type("   ");
    cy.xpath(passwordXpath).type("   ");
    cy.xpath(submitBtnXpath).click();

    // Tidak ada request valid → validasi pesan error
    cy.contains("Required").should("be.visible");
  });

  it("TC_009 - Login gagal dengan panjang karakter ekstrem", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginReq");

    const longUser = "A".repeat(255);
    const longPass = "B".repeat(255);

    cy.xpath(usernameXpath).type(longUser);
    cy.xpath(passwordXpath).type(longPass);
    cy.xpath(submitBtnXpath).click();

    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_010 - Login gagal dengan username & password salah", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginReq");

    cy.xpath(usernameXpath).type("Admin1");
    cy.xpath(passwordXpath).type("admin12");
    cy.xpath(submitBtnXpath).click();

    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_011 - Login dengan username case-insensitive (admin vs Admin)", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginReq");

    cy.xpath(usernameXpath).type("admin"); // huruf kecil
    cy.xpath(passwordXpath).type("admin123");
    cy.xpath(submitBtnXpath).click();

    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/dashboard"); // sistem ternyata case-insensitive
  });

  it("TC_012 - Login gagal dengan karakter simbol", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginReq");

    cy.xpath(usernameXpath).type("$&@*`~^|^~");
    cy.xpath(passwordXpath).type("#####");
    cy.xpath(submitBtnXpath).click();

    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_013 - User klik Forgot your password", () => {
    cy.intercept("GET", "/web/index.php/auth/requestPasswordResetCode").as(
      "resetReq"
    );

    cy.xpath("//p[contains(@class,'orangehrm-login-forgot-header')]").click();

    cy.wait("@resetReq").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "requestPasswordResetCode");
    cy.contains("Reset Password").should("be.visible");
  });
});
