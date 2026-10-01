const { test, expect } = require('../fixtures');

const products = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];

test('TC03 - adding two products updates the badge and the cart lists exactly them', async ({ page, loginPage, inventoryPage, cartPage }) => {
  await loginPage.loginAs();

  for (const product of products) {
    await inventoryPage.addToCart(product);
  }
  await expect(inventoryPage.cartBadge).toHaveText('2');

  await inventoryPage.openCart();

  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(cartPage.items).toHaveCount(2);
  await expect(cartPage.itemNames).toHaveText(products);
});
