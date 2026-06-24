import { test, expect } from '@playwright/test'

test("Infinite Scrolling", async ({ page }) => {

    test.slow(); //Wantedly keeping to make the page have time to scroll
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

    let prevHeight = 0;
    let bookFound = false;
    //Scroll from start to end of height
    while (true) {

        const bookTitles = await page.locator("div#productsDiv h3").allTextContents();

        if (bookTitles.includes("The World's Worst Parents")) {
            console.log("Book Found");
            bookFound = true;
            expect(bookFound).toBeTruthy();
            break;
        }


        //scroll down the current visible page height
        await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight) })

        //capture the visible page height
        const currentHeight = await page.evaluate(() => {
            return document.body.scrollHeight;

        })
        console.log("Previous Height ", prevHeight);
        console.log("Current Height ", currentHeight);
        if (currentHeight == prevHeight) {
            break;
        }
        prevHeight = currentHeight;

    }
    console.log("Reached end of page....")
    
    if (!bookFound) {
        console.log("Book Not Found")
    }
})