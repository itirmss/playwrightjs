const { test, expect } = require('../fixtures');

const validInfo = { firstName: 'Ram', lastName: 'Sharma', postalCode: '44600' };

// Data-driven: each row leaves one required field empty.
const missingFieldCases = [
  { field: 'first name', info: { ...validInfo, firstName: '' }, expectedError: 'Error: First Name is required' },
  { field: 'last name', info: { ...validInfo, lastName: '' }, expectedError: 'Error: Last Name is required' },
  { field: 'postal code', info: { ...validInfo, postalCode: '' }, expectedError: 'Error: Postal Code is required' },
];

for (const data of missingFieldCases) {
  test(`TC06 - checkout form shows an error when ${data.field} is missing`, async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.loginAs();
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.fillInformation(data.info);
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toHaveText(data.expectedError);
    // User must not move on to the overview step
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
}
