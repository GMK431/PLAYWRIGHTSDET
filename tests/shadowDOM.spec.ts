//Playwright automatically supports shadowDOM. Only limitation is we cant use xpath

import { test, expect } from '@playwright/test'

test("Shadow DOM", async ({ page }) => {

    await page.goto("https://shop.polymer-project.org/");

    page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click();

    await page.waitForTimeout(5000);

    const productsFound = await page.locator("div.title").all();
    console.log("No. of Products : ", productsFound.length);

    expect(productsFound.length).toBe(16);

})