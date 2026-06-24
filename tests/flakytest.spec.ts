// retry can be done 2 ways
//Globally by retries attribute
//By command in terminal npx playwright test flakytest.spec.ts --retries=3 --headed


import { test, expect } from '@playwright/test'
test.only('tracing test', async ({ page, context }) => {

   
    await page.goto("https://www.demoblaze.com/index.html");
    await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123'); //Incorrect password intentionally to check screenshot
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(20000); //Intentionally put to make it flaky
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
    await page.getByRole('link', { name: 'Log out' }).click();
})