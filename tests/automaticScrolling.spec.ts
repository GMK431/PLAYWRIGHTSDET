/* There is an automatic scrolling in playwright
*/

import { test, expect } from '@playwright/test'

test("Scrolling demo", async ({ page }) => {


    await page.goto("https://demowebshop.tricentis.com/");
    const footerText = await page.locator(".footer-disclaimer").innerText();
    console.log("Footer Disclaimer is : ", footerText)
})

//Scrolling inside Dropdown
test("Scrolling inside Dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.locator("input#comboBox").click();
    const item100 = page.locator("div#dropdown div:nth-child(100)");
    console.log("Item 100 text is : ", await item100.innerText());
    await item100.click();

    await page.waitForTimeout(3000);
})

//Scrolling inside table
test.only("Scrolling inside table", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/scroll_xy.html");

    const name = await page.locator("tbody tr:nth-child(10) td:nth-child(2)").innerText();
    console.log("Last Name from 10th row & 2nd Column : ", name);

    const email = await page.locator("tbody tr:nth-child(9) td:nth-child(9)").innerText();
    console.log("Last Name from 9th row & 9th Column : ", email);
})