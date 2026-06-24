import { test, expect, Locator } from '@playwright/test';

// 1. InnerText() vs TextContent() ->Both works on single element only
test('Compare Text Methods', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const products: Locator = page.locator("h2.product-title");

    const productsCount: number = await products.count();

    console.log("Printing products Test----------Inner Text--------");
    for (let i = 0; i < productsCount; i++) {
        const productsInnerText: string = await products.nth(i).innerText(); // It just returns string and wont return null bcoz no hidden text
        console.log(productsInnerText); // It returns visible text and wont print any whitespace and hidden text. 
    }
    console.log("Printing products Test---------- Text Context--------");
    for (let i = 0; i < productsCount; i++) {
        const productsTextContent: string | null = await products.nth(i).textContent() // It returns string or null if there is no text content
        console.log(productsTextContent);// It returns all the text including hidden text and also prints whitespace. we can use trim to get plain text

    }

})

// AllTextContent() vs AllInnerText() -> Both works on multiple elements and returns array of string
test('Compare AllInnerText() vs AllTextContent()', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const products: Locator = page.locator("h2.product-title");

    console.log("Products InnerText : ", await products.allInnerTexts());
    console.log("Products TextContent : ", await products.allTextContents());
})

//3. All
test.only('All Method', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const products: Locator = page.locator("h2.product-title");
    const productsLocators: Locator[] = await products.all();
    console.log("Products Locators : ", productsLocators);

    for (let productLocator of productsLocators) {
        console.log(await productLocator.innerText());
    }


})