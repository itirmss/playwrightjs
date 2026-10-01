const { PASSWORD, USERS } = require('../test-data/users');

class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Opens the site and logs in. Defaults to standard_user. */
  async loginAs(username = USERS.standard, password = PASSWORD) {
    await this.goto();
    await this.login(username, password);
  }
}

module.exports = { LoginPage };
