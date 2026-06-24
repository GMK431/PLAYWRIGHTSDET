//3 ways
//1. Capture screenshot whatever is visible page on browser 
//2. Capture screenshot for full page
//3. Capture screenshot for particular element

import { test, expect } from '@playwright/test'

test('Screenshots Demo', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/")

    // Whenever we run this line, it overrides the old screenshot
    //Visible page 
    await page.screenshot({ path: 'screenshots/homepage.png' })

    //To retain the older screenshots also, follow this
    const timeStamp = Date.now();
    await page.screenshot({ path: 'screenshots/' + 'homepage' + timeStamp + '.png' }); //Since there is timestamp, it wont override the screenshots


    //Full page screenshot
    await page.screenshot({ path: 'screenshots/' + 'homepageFullpage' + timeStamp + '.png', fullPage: true })

    //Particular element screenshot
    const logo = page.getByAltText("Tricentis Demo Web Shop");
    await logo.screenshot({ path: 'screenshots/' + 'Logo' + timeStamp + '.png' });

    //All feature products
    await page.locator("div.page").screenshot({ path: 'screenshots/' + 'featureProduct' + timeStamp + '.png' })
})

//Preferable mostly globally that too, only-on-failure option. Bcoz, screenshot will attach to report also
//Video also taken by configuring globally
//By default screenshots and videos will store under test-results folder
test.only('Screenshots from Config', async ({ page }) => {

    await page.goto("https://www.demoblaze.com/index.html");
    await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123x'); //Incorrect password intentionally to check screenshot
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
    await page.getByRole('link', { name: 'Log out' }).click();
})