import { test, expect, Locator } from '@playwright/test';

test("datepicker", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateInput: Locator = page.locator("input#datepicker");
    expect(dateInput).toBeVisible();
    //1. using fill method
    dateInput.fill("08/11/1996"); //mm/dd/yyyy

    //2. select target date

    const year = "2010";
    const month = "August";
    const day = "11";

    await dateInput.click(); // Open the datepicker
    while (true) {
        const currentMonth = await page.locator("span.ui-datepicker-month").textContent();
        const currentYear = await page.locator("span.ui-datepicker-year").textContent();
        if (currentMonth == month && currentYear == year) {
            break;
        }

        //Future month and year
        //await page.locator("a.ui-datepicker-next").click(); // Click the next button
        //Past month and year
        await page.locator("a.ui-datepicker-prev").click(); // Click the previous button

    }
    const alldates: Locator[] = await page.locator("table.ui-datepicker-calendar td").all();

    for (let dates of alldates) {
        const dateText = await dates.innerText();
        if (dateText == day) {
            await dates.click();
            break;
        }
    }















    await page.waitForTimeout(5000);


})