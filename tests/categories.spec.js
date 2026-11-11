const { test, expect } = require('@playwright/test');
const { CreateCategoryPage } = require('./pages/CreateCategoryPage');
const { CreateItemPage } = require('./pages/CreateItemPage');

test.describe('Category Management', () => {
  test('should successfully add a new category', async ({ page }) => {
    const categoryName = `Category_${Date.now()}`;
    const createCategoryPage = new CreateCategoryPage(page);

    await createCategoryPage.goto();
    await expect(createCategoryPage.heading).toHaveText('Add New Category');

    await createCategoryPage.createCategory(categoryName);

    // Submitting redirects back to the add category form
    await expect(page).toHaveURL(/\/categories\/new$/);
    await expect(createCategoryPage.nameInput).toHaveValue('');

    // The new category is available when creating an item
    const createItemPage = new CreateItemPage(page);
    await createItemPage.goto();
    const options = await createItemPage.getCategoryOptions();
    expect(options).toContain(categoryName);
  });

  test('should handle adding an existing Books category without error', async ({ page }) => {
    const createCategoryPage = new CreateCategoryPage(page);
    const createItemPage = new CreateItemPage(page);

    await createItemPage.goto();
    const before = await createItemPage.getCategoryOptions();
    expect(before).toContain('Books');

    await createCategoryPage.goto();
    await createCategoryPage.createCategory('Books');

    // Request succeeds and redirects back to the form
    await expect(page).toHaveURL(/\/categories\/new$/);
    await expect(createCategoryPage.heading).toHaveText('Add New Category');
    await expect(createCategoryPage.nameInput).toHaveValue('');

    // No duplicate Books entry is created
    await createItemPage.goto();
    const after = await createItemPage.getCategoryOptions();
    expect(after.filter((c) => c === 'Books')).toHaveLength(1);
    expect(after).toHaveLength(before.length);
  });
});
