const { test, expect } = require('../fixtures');

const TAX_RATE = 0.08; // Sauce Demo applies 8% tax to the item total
const products = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];

test('TC05 - checkout shows correct totals and completes the order', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.loginAs();

  // Add products and remember the prices shown on the products page
  const prices = [];
  for (const product of products) {
    prices.push(await inventoryPage.getPrice(product));
    await inventoryPage.addToCart(product);
  }

  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation({ firstName: 'Ram', lastName: 'Sharma', postalCode: '44600' });
  await checkoutPage.continue();

  // Overview page: the chosen products and correctly calculated totals
  await expect(checkoutPage.title).toHaveText('Checkout: Overview');
  await expect(checkoutPage.itemNames).toHaveText(products);

  const expectedSubtotal = prices.reduce((sum, price) => sum + price, 0);
  const expectedTax = Math.round(expectedSubtotal * TAX_RATE * 100) / 100;
  const expectedTotal = expectedSubtotal + expectedTax;

  expect(await checkoutPage.getSubtotal()).toBeCloseTo(expectedSubtotal, 2);
  expect(await checkoutPage.getTax()).toBeCloseTo(expectedTax, 2);
  expect(await checkoutPage.getTotal()).toBeCloseTo(expectedTotal, 2);

  await checkoutPage.finish();

  // Confirmation page
  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  await expect(checkoutPage.completeText).toContainText('Your order has been dispatched');
  await expect(inventoryPage.cartBadge).toBeHidden();
});
