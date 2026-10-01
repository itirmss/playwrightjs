const { test, expect } = require('../fixtures');
const { PASSWORD, USERS } = require('../test-data/users');

// Data-driven: the same test body runs once for each row below.
const invalidLogins = [
  {
    case: 'wrong password',
    username: USERS.standard,
    password: 'wrong_password',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    case: 'empty username',
    username: '',
    password: PASSWORD,
    expectedError: 'Epic sadface: Username is required',
  },
  {
    case: 'empty password',
    username: USERS.standard,
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
  {
    case: 'locked out user',
    username: USERS.lockedOut,
    password: PASSWORD,
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
];

for (const data of invalidLogins) {
  test(`TC02 - login fails with ${data.case}`, async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(data.username, data.password);

    await expect(loginPage.errorMessage).toHaveText(data.expectedError);
    // User must stay on the login page
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });
}
