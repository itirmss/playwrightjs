const base = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const { CartPage } = require('./pages/CartPage');
const { CheckoutPage } = require('./pages/CheckoutPage');

/**
 * Extends Playwright's test so each test can ask for the page objects it needs,
 * e.g. test('...', async ({ loginPage, cartPage }) => { ... }).
 * Every test still gets its own fresh browser page, so tests stay independent.
 */
const test = base.test.extend({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

module.exports = { test, expect: base.expect };
