const { test, expect } = require('../fixtures');
const { USERS } = require('../test-data/users');

/**
 * Known defects from BUGS.md.
 * Each test asserts the CORRECT behaviour and is marked test.fail(), so:
 *  - while the bug exists the test "fails as expected" and the suite stays green
 *  - if the bug is fixed, Playwright reports the test as unexpectedly passing,
 *    telling us to remove the test.fail() marker.
 */
test.describe('Known bugs', () => {
  test('BUG-01 - problem_user: last name input is kept on checkout', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    test.fail(true, 'BUG-01: typing in Last Name overwrites First Name for problem_user');

    await loginPage.loginAs(USERS.problem);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation({ firstName: 'Ram', lastName: 'Sharma', postalCode: '44600' });

    await expect(checkoutPage.firstNameInput).toHaveValue('Ram');
    await expect(checkoutPage.lastNameInput).toHaveValue('Sharma');
  });

  test('BUG-02 - error_user: Finish completes the order', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    test.fail(true, 'BUG-02: Finish does nothing for error_user');

    await loginPage.loginAs(USERS.error);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation({ firstName: 'Ram', lastName: 'Sharma', postalCode: '44600' });
    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  });

  test('BUG-03 - problem_user: sorting by price works', async ({ loginPage, inventoryPage }) => {
    test.fail(true, 'BUG-03: sort dropdown has no effect for problem_user');

    await loginPage.loginAs(USERS.problem);
    await inventoryPage.sortBy('lohi');

    await expect(inventoryPage.activeSortOption).toHaveText('Price (low to high)');
  });
});
