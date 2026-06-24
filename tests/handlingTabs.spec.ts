import { test, expect, chromium, Browser, BrowserContext, Page } from "@playwright/test";

test("Tabs Demo", async () => {

    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    const parentPage: Page = await context.newPage();

    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    //This method is used to handle promise returning statements simultaneously, 
    // where it takes statements in an array and waits for all the statements to get resolved 

    //Basically both statements should run simultaneously, so we are waiting for the new page to open after clicking on "New Tab" link 
    // and then we are performing actions on that new page.
    const [childPage] = await Promise.all([context.waitForEvent('page'), parentPage.getByText("New Tab").click()]);

    //Approach 1. Morethan 2 tabs
    const pages = context.pages()
    console.log("No.of Pages: ", context.pages().length);
    console.log("Parent Page Title is: ", await pages[0].title());
    console.log("Child Page Title is: ", await pages[1].title());

    //Approach 2. Use when have only 2 tabs
    console.log("---------Approach 2---------");
    console.log("ParentPage Title is : ", await parentPage.title());
    await expect(parentPage).toHaveTitle("Automation Testing Practice");
    console.log("ChildPage Title is : ", await childPage.title());
    await expect(childPage).toHaveTitle("SDET-QA Blog");







})