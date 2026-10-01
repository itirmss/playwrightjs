const { test, expect } = require('../fixtures');

test('TC04 - removing a product updates the badge and the cart contents', async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.loginAs();
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
  await inventoryPage.openCart();
  await expect(cartPage.items).toHaveCount(2);

  await cartPage.remove('Sauce Labs Backpack');

  await expect(cartPage.cartBadge).toHaveText('1');
  await expect(cartPage.items).toHaveCount(1);
  await expect(cartPage.itemNames).toHaveText(['Sauce Labs Bolt T-Shirt']);

  // Removing the last item should clear the badge completely
  await cartPage.remove('Sauce Labs Bolt T-Shirt');

  await expect(cartPage.cartBadge).toBeHidden();
  await expect(cartPage.items).toHaveCount(0);
});
