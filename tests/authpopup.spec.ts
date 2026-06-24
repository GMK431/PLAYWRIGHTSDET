import { test, expect, chromium, Browser, BrowserContext, Page } from "@playwright/test";

//Approach 1: Pass Username and password in url -> Not a good approach

test("Auth popup", async () => {

    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");

    await page.waitForLoadState(); //wait for page loaded completely

    const successText = page.getByText("Congratulations!");
    expect(successText).toBeVisible();
    await page.waitForTimeout(5000);

})

//Approach 2 : Passing in browserContext ->preferrable
test.only('Authentication popup', async () => {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } });
    const page: Page = await context.newPage();

    await page.goto("https://the-internet.herokuapp.com/basic_auth");

    await page.waitForLoadState(); //wait for page loaded completely

    const successText = page.getByText("Congratulations!");
    expect(successText).toBeVisible();
    await page.waitForTimeout(5000);


})