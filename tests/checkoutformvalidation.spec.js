const { test, expect } = require('@playwright/test');

const checkoutTestData = [
  {
    name: 'missing first name',
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
    expectedError: 'Error: First Name is required',
  },
  {
    name: 'missing last name',
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
    expectedError: 'Error: Last Name is required',
  },
  {
    name: 'missing postal code',
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
    expectedError: 'Error: Postal Code is required',
  },
];

for (const data of checkoutTestData) {
  test(`Checkout validation - ${data.name}`, async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
       await page.waitForTimeout(1000)


    // Add a product
    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    // Go to cart
    await page.locator('.shopping_cart_link').click();

    // Start checkout
    await page.locator('[data-test="checkout"]').click();
   await page.waitForTimeout(1000)

    // Fill checkout form with test data
    await page.locator('[data-test="firstName"]').fill(data.firstName);
    await page.locator('[data-test="lastName"]').fill(data.lastName);
    await page.locator('[data-test="postalCode"]').fill(data.postalCode);

    // Submit checkout information
    await page.locator('[data-test="continue"]').click();
       await page.waitForTimeout(1000)


    // Verify correct validation error
    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(data.expectedError);

    // User should remain on checkout information page
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });
}
