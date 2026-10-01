class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  item(productName) {
    return this.items.filter({
      has: this.page.getByTestId('inventory-item-name').getByText(productName, { exact: true }),
    });
  }

  async remove(productName) {
    await this.item(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
