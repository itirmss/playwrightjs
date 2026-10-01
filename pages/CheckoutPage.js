const { parsePrice } = require('../utils/price');

/**
 * Covers the three checkout screens:
 * step one (your information), step two (overview) and the confirmation page.
 */
class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');

    // Step one: your information
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.errorMessage = page.getByTestId('error');

    // Step two: overview
    this.itemNames = page.getByTestId('inventory-item-name');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');

    // Confirmation
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
  }

  async fillInformation({ firstName, lastName, postalCode }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async getSubtotal() {
    return parsePrice(await this.subtotalLabel.textContent());
  }

  async getTax() {
    return parsePrice(await this.taxLabel.textContent());
  }

  async getTotal() {
    return parsePrice(await this.totalLabel.textContent());
  }

  async finish() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };
