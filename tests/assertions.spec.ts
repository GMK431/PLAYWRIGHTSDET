//2 Types of Assertions
//1 Auto Retry Assertion -> Basically, perform directly on locator -> Auto wait until it pass or time-out
//2 Non Retry Assertion -> Basically perform on value where it doesnt include any locator. Doesnt follow time-out
//3. Negating Matcher ->applicable for both Auto Retry & Non Retry Assertions

import { test, expect, Browser, BrowserContext, Locator, Page, chromium } from '@playwright/test'

test('Assertions', async () => {

    const browser: Browser = await chromium.launch();
    const browserContext: BrowserContext = await browser.newContext();
    const page: Page = await browserContext.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Auto Retry Assertion -> Directly performing on locator
    await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
    await expect(page.getByText("GUI Elements")).toBeVisible();

    //Non Retry Assertion
    await page.locator("input#name").fill("Dedeepya");
    const inputText = await page.locator("input#name").inputValue();
    expect(inputText).toBe("Dedeepya");

    //Negation Matcher
    await page.locator("input#name").fill("Dedeepya");
    const inputText1 = await page.locator("input#name").inputValue();
    expect(inputText1).toBe("John");


})