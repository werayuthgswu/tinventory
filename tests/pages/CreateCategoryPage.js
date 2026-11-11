class CreateCategoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.nameInput = page.locator('input[name="name"]');
    this.submitButton = page.getByRole('button', { name: 'Add Category' });
    this.backLink = page.getByRole('link', { name: 'Back to Items' });
  }

  async goto() {
    await this.page.goto('/categories/new');
  }

  async createCategory(name) {
    await this.nameInput.fill(name);
    await this.submitButton.click();
  }
}

module.exports = { CreateCategoryPage };
