import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
  await page.getByRole('link', { name: 'Log out' }).click();
});


//npx playwright codegen -> Just opens the testgen terminal.
//npx playwright codegen -o tests/codegen.spec.ts -> Opens the testgen terminal and copies the code by creating a new testfile 'codegen.spec.ts'
//npx playwright codegen -o tests/codegen.spec.ts -d "iphone 15" -> overrides the code in "codegen.spec.ts" and creates the test file and run in mobile device view
//npx playwright codegen -o tests/codegen.spec.ts -b firefox -> Opens firefox browser
//npx playwright codegen -o tests/codegen.spec.ts --viewport.size "1280,720" ->window size
//npx playwright test codegen.spec.ts --headed --debug  -> to debug