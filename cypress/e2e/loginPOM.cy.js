import LoginPage from "../pages/LoginPage";
import loginData from "../fixtures/loginData.json";

describe("OrangeHRM - Login with POM", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("TC01 - Login sukses dengan username & password valid", () => {
    LoginPage.enterUsername(loginData.validUsername);
    LoginPage.enterPassword(loginData.validPassword);
    LoginPage.clickLogin();
    LoginPage.assertDashboardVisible();
  });

  it("TC02 - Login gagal dengan password salah", () => {
    LoginPage.enterUsername(loginData.validUsername);
    LoginPage.enterPassword(loginData.invalidPassword);
    LoginPage.clickLogin();
    LoginPage.assertInvalidCredentials();
  });

  it("TC03 - Login gagal dengan username salah", () => {
    LoginPage.enterUsername(loginData.invalidUsername);
    LoginPage.enterPassword(loginData.validPassword);
    LoginPage.clickLogin();
    LoginPage.assertInvalidCredentials();
  });

  it("TC04 - Login gagal dengan username kosong", () => {
    LoginPage.enterPassword(loginData.validPassword);
    LoginPage.clickLogin();
    LoginPage.assertRequiredField();
  });

  it("TC05 - Login gagal dengan password kosong", () => {
    LoginPage.enterUsername(loginData.validUsername);
    LoginPage.clickLogin();
    LoginPage.assertRequiredField();
  });

  it("TC06 - Login gagal dengan username & password kosong", () => {
    LoginPage.clickLogin();
    LoginPage.assertRequiredField();
  });

  it("TC07 - Login sukses dengan menekan Enter (shortcut)", () => {
    LoginPage.enterUsername(loginData.validUsername);
    cy.xpath(LoginPage.passwordField)
      .clear()
      .type(loginData.validPassword + "{enter}");
    LoginPage.assertDashboardVisible();
  });

  it("TC08 - Login gagal dengan input spasi saja", () => {
    LoginPage.enterUsername(loginData.space);
    LoginPage.enterPassword(loginData.space);
    LoginPage.clickLogin();
    LoginPage.assertRequiredField();
  });

  it("TC09 - Login gagal dengan panjang karakter ekstrem", () => {
    LoginPage.enterUsername(loginData.longUsername);
    LoginPage.enterPassword(loginData.longPassword);
    LoginPage.clickLogin();
    LoginPage.assertInvalidCredentials();
  });

  it("TC10 - Login gagal dengan karakter simbol", () => {
    LoginPage.enterUsername(loginData.symbolUsername);
    LoginPage.enterPassword(loginData.symbolPassword);
    LoginPage.clickLogin();
    LoginPage.assertInvalidCredentials();
  });

  it("TC11 - User klik Forgot your password", () => {
    LoginPage.clickForgotPassword();
    LoginPage.assertResetPasswordPage();
  });
});
