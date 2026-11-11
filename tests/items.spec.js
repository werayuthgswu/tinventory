const { test, expect } = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { CreateItemPage } = require('./pages/CreateItemPage');

test.describe('Item Management', () => {
  let createItemPage;

  test.beforeEach(async ({ page }) => {
    createItemPage = new CreateItemPage(page);
    await createItemPage.goto();
  });


  test('should successfully create an item with all fields and redirect to home page', async ({ page }) => {
    const itemName = `Laptop_${Date.now()}`;
    const category = 'Electronics';
    const detail = 'High-end developer laptop with 32GB RAM';

    await createItemPage.createItem({
      name: itemName,
      category,
      detail,
    });

    // Submitting redirects to '/'
    await expect(page).toHaveURL('/');

    const homePage = new HomePage(page);
    const itemEntry = homePage.getItemEntry(itemName);
    await expect(itemEntry).toBeVisible();
    await expect(itemEntry).toContainText(itemName);
    await expect(itemEntry).toContainText(category);
    await expect(itemEntry).toContainText('(0 comments)');
  });


  test('should successfully create an item without detail field and redirect to home page', async ({ page }) => {
    const itemName = `Harry_${Date.now()}`;
    const category = 'Books';
    const detail = '';

    await createItemPage.createItem({
      name: itemName,
      category,
      detail,
    });

    // Submitting redirects to '/'
    await expect(page).toHaveURL('/');

    const homePage = new HomePage(page);
    const itemEntry = homePage.getItemEntry(itemName);
    await expect(itemEntry).toBeVisible();
    await expect(itemEntry).toContainText(itemName);
    await expect(itemEntry).toContainText(category);
    await expect(itemEntry).toContainText('(0 comments)');
  });



  test('should return 404 when navigating to a non-existent item id', async ({ page }) => {
    const response = await page.goto('/items/999999');
    expect(response.status()).toBe(404);
    await expect(page.locator('body')).toContainText('Item not found');
  });
});
