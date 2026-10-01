import { test, expect } from '@playwright/test';

test('Displayed prices are in ascending order', async ({ page }) => {

  // Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Select "Price (low to high)"
  await page.locator('[data-test="product-sort-container"]')
    .selectOption('lohi');
       await page.waitForTimeout(1000)

  // Get all displayed prices
  const priceElements = page.locator('.inventory_item_price');
  const priceTexts = await priceElements.allTextContents();
         await page.waitForTimeout(1000)


  // Convert "$29.99" → 29.99
  const prices = priceTexts.map(price =>
    parseFloat(price.replace('$', ''))
  );

  console.log('Displayed prices:', prices);

  // Verify ascending order
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
         await page.waitForTimeout(1000)

});