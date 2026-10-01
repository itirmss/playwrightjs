const { test, expect } = require('@playwright/test');

test('Remove product from cart updates badge and contents', async ({ page }) => {
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

  await page
    .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
    .click();

  // Verify cart badge shows 2
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  // Open cart
  await page.locator('.shopping_cart_link').click();

  // Verify both products are in the cart
  await expect(page.locator('.cart_item')).toHaveCount(2);

  await expect(page.locator('.inventory_item_name')).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bolt T-Shirt',
  ]);
   await page.waitForTimeout(5000)

  // Remove Sauce Labs Backpack
  await page
    .locator('[data-test="remove-sauce-labs-backpack"]')
    .click();

  // Verify cart badge is updated to 1
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
   await page.waitForTimeout(5000)

  // Verify only one product remains
  await expect(page.locator('.cart_item')).toHaveCount(1);
   await page.waitForTimeout(5000)

  // Verify the remaining product is the Bolt T-Shirt
  await expect(page.locator('.inventory_item_name'))
    .toHaveText('Sauce Labs Bolt T-Shirt');
    await page.waitForTimeout(5000)
});
