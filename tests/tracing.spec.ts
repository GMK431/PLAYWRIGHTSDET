//Tracing can be capture on 3 ways
//-----------------------------------------
// By Config file - attribute trace
// To run for a particular test -> In terminal, give npx playwright test --tracing.spec.ts --trace on
//To capture trace, we need context like below code


//View Tracing
//----------
//1. from html report --> click on trace.zip
//2. through command  ---> npx playwright show-trace trace.zip
//3. Utility ----> https://trace.playwright.dev/ ---> drag and drop/upload trace.zip

import { test, expect } from '@playwright/test'
test.only('tracing test', async ({ page, context }) => {

    await context.tracing.start({ screenshots: true, snapshots: true });// By this line, we can start the tracing
    await page.goto("https://www.demoblaze.com/index.html");
    await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123x'); //Incorrect password intentionally to check screenshot
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
    await page.getByRole('link', { name: 'Log out' }).click();

    await context.tracing.stop({ path: 'trace.zip' }); //To stop and save file with file name. 
    // This will save under project and it wont attach html report-->Limitation here
})
