import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'url';
import path from 'path';

// Turn the local index.html file into a URL the browser can open
const drillPage = pathToFileURL(path.join(__dirname, 'index.html')).href;

test('Flakiness drill: Save shows "Saved"', async ({ page }) => {
  await page.goto(drillPage);
  await page.getByRole('button', { name: 'Save' }).click();

  // UNFIXED: wait a fixed time (my guess), then read the message once
  await page.waitForTimeout(500);
  const message = await page.locator('#status').textContent();

  // Plain check: it does not retry
  expect(message).toBe('Saved');
});