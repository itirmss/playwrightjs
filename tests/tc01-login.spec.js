const { test, expect } = require('../fixtures');

test('TC01 - login with valid credentials shows the products page', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.loginAs(); // standard_user

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventoryPage.title).toHaveText('Products');
  await expect(inventoryPage.items).toHaveCount(6);
});
