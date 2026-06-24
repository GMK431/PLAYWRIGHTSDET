
//Browser can have -> Multiple Context will have -> Multiple Pages
import { test, expect, Locator, Page, BrowserContext, chromium, Browser } from '@playwright/test';

//Context --> It is like an incognito window in the browser, it allows us to create a new browser context which is isolated  from other contexts. 
//Each context can have its own cookies, cache and other browser settings. 
// It is useful when we want to test different scenarios in the same test or when we want to test the same scenario 
// with different data.
//Page -> It is a single tab in the browser, it allows us to interact with the web page and perform actions like click, fill, etc.
//Tab, Window, popup are all pages in the browser.
test("Browser Context Demo", async () => {

    const browser: Browser = await chromium.launch(); // to launch the browser
    const context: BrowserContext = await browser.newContext();

    //First Page created with context
    const page1: Page = await context.newPage();
    //Second Page created with same context
    const page2: Page = await context.newPage();

    console.log("No. of pages created with same Context: ", context.pages().length); // to get all the pages present in the context

    //Launching different url's with 2 different pages and in same context
    await page1.goto("https://testautomationpractice.blogspot.com/");
    await page2.goto("https://www.w3schools.com/");

    expect(await page1.title()).toBe("Automation Testing Practice");
    expect(await page2.title()).toBe("W3Schools Online Web Tutorials");


    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(5000);

})