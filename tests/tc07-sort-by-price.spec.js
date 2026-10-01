const { test, expect } = require('../fixtures');

test('TC07 - sorting by price (low to high) shows prices in ascending order', async ({ loginPage, inventoryPage }) => {
  await loginPage.loginAs();

  // Default order is Name (A to Z), where prices are not ascending.
  // Checking this first proves the sort below actually changed something.
  const pricesBefore = await inventoryPage.getAllPrices();
  expect(pricesBefore).not.toEqual([...pricesBefore].sort((a, b) => a - b));

  await inventoryPage.sortBy('lohi');
  // Waiting for the dropdown label confirms the sort has been applied before reading prices
  await expect(inventoryPage.activeSortOption).toHaveText('Price (low to high)');

  const pricesAfter = await inventoryPage.getAllPrices();
  expect(pricesAfter).toHaveLength(pricesBefore.length);
  expect(pricesAfter).toEqual([...pricesAfter].sort((a, b) => a - b));
});
