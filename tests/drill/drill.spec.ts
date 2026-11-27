import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'url';
import path from 'path';

// Turn the local index.html file into a URL the browser can open
const drillPage = pathToFileURL(path.join(__dirname, 'index.html')).href;

test('Flakiness drill: Save shows "Saved"', async ({ page }) => {
  await page.goto(drillPage);
  await page.getByRole('button', { name: 'Save' }).click();

  // FIXED: wait for the condition, not a guessed time.
  // toHaveText retries until the message says "Saved" (up to 5 seconds).
  await expect(page.locator('#status')).toHaveText('Saved');
});