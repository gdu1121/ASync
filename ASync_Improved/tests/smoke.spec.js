const { test, expect } = require('@playwright/test');

test('ASync home page loads and navigation works', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/ASync/i);
  await expect(page.locator('h1')).toContainText('Your people');

  await page.locator('nav a[href="friends.html"]').first().click();
  await expect(page).toHaveURL(/friends\.html$/);

  await page.goto('/signup.html');
  await expect(page.locator('h3')).toContainText(/Create your demo profile/i);
});
