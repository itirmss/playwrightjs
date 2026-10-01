const { parsePrice } = require('../utils/price');

class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.items = page.getByTestId('inventory-item');
    this.itemPrices = page.getByTestId('inventory-item-price');
  }

  /** Returns the product card whose name matches exactly. */
  item(productName) {
    return this.items.filter({
      has: this.page.getByTestId('inventory-item-name').getByText(productName, { exact: true }),
    });
  }

  async addToCart(productName) {
    await this.item(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  /** Reads the price shown on a product card, e.g. "$29.99" -> 29.99 */
  async getPrice(productName) {
    return parsePrice(await this.item(productName).getByTestId('inventory-item-price').textContent());
  }

  /** @param {'az' | 'za' | 'lohi' | 'hilo'} option */
  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getAllPrices() {
    const texts = await this.itemPrices.allTextContents();
    return texts.map(parsePrice);
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
