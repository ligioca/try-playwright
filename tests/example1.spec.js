const { test, expect } = require('@playwright/test');

test('my test chrome', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    console.log(process.env.CI + "#############")
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  
    // Expect an attribute "to be strictly equal" to the value.
    await expect(page.locator('text=Get Started').first()).toHaveAttribute('href', '/docs/intro');
  
    await page.click('text=Get Started');
    // Expect some text to be visible on the page.
    await expect(page.locator('text=Introduction').first()).toBeVisible();
  });