# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: signup.spec.js >> password toggle works
- Location: signup.spec.js:29:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:8000/
Call log:
  - navigating to "http://127.0.0.1:8000/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test('signup form works', async ({ page }) => {
  4  | 
  5  |     await page.goto('http://127.0.0.1:8000');
  6  | 
  7  |     await page.fill('#name', 'Garrick');
  8  | 
  9  |     await page.fill('#email', 'garrick@test.com');
  10 | 
  11 |     await page.fill('#password', 'password123');
  12 | 
  13 |     await page.click('#signupBtn');
  14 | 
  15 |     await expect(page.locator('#message'))
  16 |         .toContainText('Welcome to ASync');
  17 | });
  18 | 
  19 | test('dark mode toggle works', async ({ page }) => {
  20 | 
  21 |     await page.goto('http://127.0.0.1:8000');
  22 | 
  23 |     await page.click('#darkModeBtn');
  24 | 
  25 |     await expect(page.locator('body'))
  26 |         .toHaveClass(/dark-mode/);
  27 | });
  28 | 
  29 | test('password toggle works', async ({ page }) => {
  30 | 
> 31 |     await page.goto('http://127.0.0.1:8000');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:8000/
  32 | 
  33 |     await page.fill('#password', 'secret123');
  34 | 
  35 |     await page.click('#togglePassword');
  36 | 
  37 |     await expect(page.locator('#password'))
  38 |         .toHaveAttribute('type', 'text');
  39 | });
```