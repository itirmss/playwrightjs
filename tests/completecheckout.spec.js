const { test, expect } = require('@playwright/test');

test('Complete checkout and verify order totals', async ({ page }) => {
  // Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add two products
  await page
    .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    .click();
   await page.waitForTimeout(1000)

  await page
    .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
    .click();
       await page.waitForTimeout(1000)


  // Open cart
  await page.locator('.shopping_cart_link').click();

  // Verify two products are in the cart
  await expect(page.locator('.cart_item')).toHaveCount(2);
   await page.waitForTimeout(1000)

  // Proceed to checkout
  await page.locator('[data-test="checkout"]').click();

  // Enter customer information
  await page.locator('[data-test="firstName"]').fill('Ram');
  await page.locator('[data-test="lastName"]').fill('Sharma');
  await page.locator('[data-test="postalCode"]').fill('12345');
   await page.waitForTimeout(1000)

  // Continue to overview
  await page.locator('[data-test="continue"]').click();
     await page.waitForTimeout(1000)


  // Verify overview page
  await expect(page.locator('.title'))
    .toHaveText('Checkout: Overview');

  // Verify item total
  await expect(page.locator('.summary_subtotal_label'))
    .toHaveText('Item total: $45.98');

  // Verify tax
  await expect(page.locator('.summary_tax_label'))
    .toHaveText('Tax: $3.68');

  // Verify final total
  await expect(page.locator('.summary_total_label'))
    .toHaveText('Total: $49.66');
       await page.waitForTimeout(1000)


  // Finish checkout
  await page.locator('[data-test="finish"]').click();

  // Verify order confirmation page
  await expect(page).toHaveURL(/checkout-complete.html/);

  await expect(page.locator('.title'))
    .toHaveText('Checkout: Complete!');
       await page.waitForTimeout(1000)


  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
       await page.waitForTimeout(1000)


  // Verify confirmation message
  await expect(page.locator('.complete-text'))
    .toContainText('Your order has been dispatched');
       await page.waitForTimeout(1000)

});
