const { test, expect } = require('@playwright/test');

test('Cart contains exactly two added products', async ({ page }) => {
  // Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Products we want to add
  const products = [
    {
      name: 'Sauce Labs Backpack',
      selector: '[data-test="add-to-cart-sauce-labs-backpack"]',
    },
    {
      name: 'Sauce Labs Bolt T-Shirt',
      selector: '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
    },
  ];

  // Add both products
  for (const product of products) {
    await page.locator(product.selector).click();
  }

  // Verify cart badge shows 2
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  // Open cart
  await page.locator('.shopping_cart_link').click();

  // Verify exactly 2 products are listed
  const cartItems = page.locator('.cart_item');

  await expect(cartItems).toHaveCount(2);

  // Verify the exact products
  const productNames = page.locator('.inventory_item_name');

  await expect(productNames).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bolt T-Shirt',
  ]);
  await page.waitForTimeout(5000)
});
