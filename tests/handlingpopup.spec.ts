import { test, expect, chromium, Browser, BrowserContext, Page } from "@playwright/test";

test("popup Demo", async () => {

    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Multiple popup
    await Promise.all([page.waitForEvent('popup'), page.waitForEvent('popup'), page.locator("#PopUp").click()]);

    const allpopupWindows = context.pages();
    console.log("Number of popup : ", allpopupWindows.length);

    await page.waitForTimeout(5000);
    console.log("Main Page URL: ", allpopupWindows[0].url());
    console.log("First popup window URL : ", allpopupWindows[1].url());
    //console.log("Second popup window URL : ", allpopupWindows[2].url());


    for (let pw of allpopupWindows)
        if ((await pw.title()).includes('selenium')) {
            pw.close();
        }


    await page.waitForTimeout(5000);

})