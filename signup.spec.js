const { test, expect } = require('@playwright/test');

test('signup form works', async ({ page }) => {

    await page.goto('http://127.0.0.1:8000');

    await page.fill('#name', 'Garrick');

    await page.fill('#email', 'garrick@test.com');

    await page.fill('#password', 'password123');

    await page.click('#signupBtn');

    await expect(page.locator('#message'))
        .toContainText('Welcome to ASync');
});

test('dark mode toggle works', async ({ page }) => {

    await page.goto('http://127.0.0.1:8000');

    await page.click('#darkModeBtn');

    await expect(page.locator('body'))
        .toHaveClass(/dark-mode/);
});

test('password toggle works', async ({ page }) => {

    await page.goto('http://127.0.0.1:8000');

    await page.fill('#password', 'secret123');

    await page.click('#togglePassword');

    await expect(page.locator('#password'))
        .toHaveAttribute('type', 'text');
});