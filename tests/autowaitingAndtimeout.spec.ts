import { test, expect, Browser, BrowserContext, Locator, Page, chromium } from '@playwright/test'

// By default, playwright will check for some actionability checks like visible, Stable, Receives Event, Enabled, Editable
//before performing any actions on element like click, fill,..... If once, those actionability checks got success, then only it will perform
//actions, other wise throws an TimeoutError.

// For actions, auto-waiting time is 30sec
// For assertions, auto-waiting time is 5sec
test('Autowaiting', async () => {

    const browser: Browser = await chromium.launch();
    const browserContext: BrowserContext = await browser.newContext();
    const page: Page = await browserContext.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Assertions - Autowait works
    await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
    await expect(page.getByText("GUI Elements")).toBeVisible();

    //Actions - Autowait works
    await page.locator("input#name").fill("Dedeepya");
    await page.locator("input.wikipedia-search-button").click();

    //Above autowait works, but if we dont want to auto-wait and need to stop it forcefully then we need to write like below
    //Improves performance,since it wont wait for 30sec
    await page.locator("input#name").fill("Dedeepya", { force: true }); 
    await page.locator("input.wikipedia-search-button").click({ force: true });
})

//2 different ways to set timeOut for test 
//Test level
//Globally at config level -> timeout :40000//Increase to 40sec
//particularly at test level ->Inside a particular test like below
//Globally at config level -> expect : {timeout : 10000} //Increase to 10sec
//particularly at test level -> Inside a particular expect like below
test('TimeOut', async () => {

    test.setTimeout(60000); //Particular test 
    test.slow() // also for timeout -> this triples the timeout -> means default is 30sec -> so it waits for 90sec
    const browser: Browser = await chromium.launch();
    const browserContext: BrowserContext = await browser.newContext();
    const page: Page = await browserContext.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Assertions - Autowait works
    await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/", {timeout :8000}); //timeout at particular assertion->8sec
    await expect(page.getByText("GUI Elements")).toBeVisible({timeout : 10000}); // timeout at particular assertion ->10sec

})