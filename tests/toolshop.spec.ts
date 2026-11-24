import { test, expect } from '@playwright/test';

test('home page has the expected title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
});

test('search for pliers shows only products with pliers in the name', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByText("products found for 'pliers'")).toBeVisible();

  const names = page.getByRole('heading', { level: 5 });
  await expect(names).toHaveCount(4);
  for (const name of await names.all()) {
    await expect(name).toContainText(/pliers/i);
  }
});

test('invalid login shows an error message', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByLabel('Email address').fill('wrong@example.com');
  await page.getByLabel('Password', { exact: false }).first().fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});