//Hard Assertion ->If first assertion got failed, then rest of code willnot execute and terminate the test immediately.
//Soft Assertion -> It marks as fail, but it wont terminate the code and executes rest of code

import { test, expect, Browser, BrowserContext, Locator, Page, chromium } from '@playwright/test'

test('Hard Vs Soft Assertions', async () => {

    const browser: Browser = await chromium.launch();
    const browserContext: BrowserContext = await browser.newContext();
    const page: Page = await browserContext.newPage();

    await page.goto("https://demowebshop.tricentis.com/");

    //Hard Assertions - uses expect
    await expect(page).toHaveTitle("Demo Web Shop1"); //Wantedly changed so it gets failed
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    const logo: Locator = page.getByAltText("Tricentis Demo Web Shop");
    await expect(logo).toBeVisible();

    //Soft Assertions - uses expect.soft
    await expect.soft(page).toHaveTitle("Demo Web Shop1");//Wantedly changed so it gets failed, but marks fail and executes test
    await expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/");
    const logo1: Locator = page.getByAltText("Tricentis Demo Web Shop");
    await expect.soft(logo1).toBeVisible();

    await page.waitForTimeout(5000);
})