const { test, expect } = require('@playwright/test');

const loginTestData = [
  {
    name: 'wrong password',
    username: 'standard_user',
    password: 'wrong_password',
    expectedError:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'empty username',
    username: '',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Username is required',
  },
  {
    name: 'empty password',
    username: 'standard_user',
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
  {
    name: 'locked out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError:
      'Epic sadface: Sorry, this user has been locked out.',
  },
];

for (const data of loginTestData) {
  test(`Login validation - ${data.name}`, async ({ page }) => {
    // Open SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Enter test data
    await page.locator('[data-test="username"]').fill(data.username);
    await page.locator('[data-test="password"]').fill(data.password);

    // Click Login
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(data.expectedError);

    // User should remain on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
}
