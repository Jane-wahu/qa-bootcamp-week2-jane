import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test('C1 Search by name: a search for "pliers" shows only products with "pliers" in the name', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.searchFor('pliers');

  // At least one product must show, so the test can't pass with an empty list
  await expect(searchPage.productNames.first()).toBeVisible();

  // No product name may be missing "pliers". This retries until the results have loaded.
  await expect(searchPage.productNames.filter({ hasNotText: /pliers/i })).toHaveCount(0);
});