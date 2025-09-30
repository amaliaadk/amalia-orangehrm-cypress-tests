class LoginPage {
  usernameField = "//input[@name='username']";
  passwordField = "//input[@name='password']";
  loginButton = "//button[@type='submit']";
  forgotPasswordLink = "//p[contains(@class,'orangehrm-login-forgot-header')]";

  visit() {
    cy.visit("/web/index.php/auth/login");
  }

  enterUsername(username) {
    cy.xpath(this.usernameField).clear().type(username);
  }

  enterPassword(password) {
    cy.xpath(this.passwordField).clear().type(password);
  }

  clickLogin() {
    cy.xpath(this.loginButton).click();
  }

  clickForgotPassword() {
    cy.xpath(this.forgotPasswordLink).click();
  }

  assertDashboardVisible() {
    cy.url().should("include", "/dashboard");
    cy.xpath("//h6[text()='Dashboard']").should("be.visible");
  }

  assertInvalidCredentials() {
    cy.get(".oxd-alert-content-text")
      .should("be.visible")
      .and("contain", "Invalid credentials");
  }

  assertRequiredField() {
    cy.get(".oxd-input-group__message")
      .should("be.visible")
      .and("contain", "Required");
  }

  assertResetPasswordPage() {
    cy.url().should("include", "requestPasswordResetCode");
    cy.contains("Reset Password").should("be.visible");
  }
}

export default new LoginPage();
