const usernameXpath = "//input[@name='username']";
const passwordXpath = "//input[@name='password']";
const submitBtnXpath = "//button[@type='submit']";

describe("OrangeHRM - Login Test Suite", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  it("TC_001 - Login dengan username & password valid", () => {
    cy.xpath(usernameXpath).clear().type("Admin");
    cy.xpath(passwordXpath).clear().type("admin123");
    cy.xpath(submitBtnXpath).click();
    // diarahkan ke dashboard
    cy.url().should("include", "/dashboard");
    cy.xpath("//h6[text()='Dashboard']").should("be.visible");
  });

  it("TC_002 - Login gagal dengan password salah", () => {
    cy.xpath(usernameXpath).clear().type("Admin");
    cy.xpath(passwordXpath).clear().type("admin1234");
    cy.xpath(submitBtnXpath).click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_003 - Login gagal dengan username salah", () => {
    cy.xpath(usernameXpath).clear().type("AdmiN");
    cy.xpath(passwordXpath).clear().type("admin1234");
    cy.xpath(submitBtnXpath).click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_004 - Login gagal dengan username kosong", () => {
    cy.xpath(passwordXpath).clear().type("admin123");
    cy.xpath(submitBtnXpath).click();
    cy.contains("Required").should("exist");
  });

  it("TC_005 - Login gagal dengan password kosong", () => {
    cy.xpath(usernameXpath).clear().type("Admin");
    cy.xpath(submitBtnXpath).click();
    cy.contains("Required").should("exist");
  });

  it("TC_006 - Login gagal dengan username & password kosong", () => {
    cy.xpath(submitBtnXpath).click();
    cy.contains("Required").should("exist");
  });

  it("TC_007 - Login dengan menekan Enter (shortcut)", () => {
    cy.xpath(usernameXpath).clear().type("Admin");
    cy.xpath(passwordXpath).clear().type("admin123{enter}");
    cy.url().should("include", "/dashboard");
  });

  it("TC_008 - Login gagal dengan input spasi saja", () => {
    cy.xpath(usernameXpath).clear().type("   ");
    cy.xpath(passwordXpath).clear().type("   ");
    cy.xpath(submitBtnXpath).click();
    cy.contains("Required").should("be.visible");
  });

  it("TC_009 - Login gagal dengan panjang karakter ekstrem", () => {
    const longUser = "A".repeat(255);
    const longPass = "B".repeat(255);
    cy.xpath(usernameXpath).clear().type(longUser);
    cy.xpath(passwordXpath).clear().type(longPass);
    cy.xpath(submitBtnXpath).click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_010 - Login gagal dengan username & password salah", () => {
    cy.xpath(usernameXpath).clear().type("Admin1");
    cy.xpath(passwordXpath).clear().type("admin12");
    cy.xpath(submitBtnXpath).click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_011 - Login dengan username case-sensitive (admin vs Admin)", () => {
    cy.xpath(usernameXpath).clear().type("admin"); // huruf kecil
    cy.xpath(passwordXpath).clear().type("admin123");
    cy.xpath(submitBtnXpath).click();
    cy.url().should("include", "/dashboard");
  });

  it("TC_012 - Login gagal dengan karakter simbol", () => {
    cy.xpath(usernameXpath).clear().type("$&@*`~^|^~");
    cy.xpath(passwordXpath).clear().type("#####");
    cy.xpath(submitBtnXpath).click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC_013 - User klik Forgot your password", () => {
    cy.xpath("//p[contains(@class,'orangehrm-login-forgot-header')]").click();
    cy.url().should("include", "requestPasswordResetCode");
    cy.contains("Reset Password").should("be.visible");
  });
});
