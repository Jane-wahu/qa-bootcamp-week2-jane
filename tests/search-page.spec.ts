import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

test('a search for pliers shows only products with pliers in the name', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.searchFor('pliers');

  await expect(searchPage.productNames).toHaveCount(4);
  for (const name of await searchPage.productNames.all()) {
    await expect(name).toContainText(/pliers/i);
  }
});