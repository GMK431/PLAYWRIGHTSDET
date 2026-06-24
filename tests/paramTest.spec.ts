import { test, expect } from '@playwright/test'


//testdata
const searchItems: string[] = ['laptop', 'Gift Card', 'monitor']; // Created dataset in test

// Using for-of loop
for (const item of searchItems) { // Need to loop to pass through every item

    test(`Search Test ${item}`, async ({ page }) => {//${item} is to make the name unique, otherwise it through an error of duplicate title
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator("input#small-searchterms").fill(item);
        await page.locator("input[value='Search']").click();
        await expect(page.locator("h2.product-title a")).toContainText(item, { ignoreCase: true });
    })
}


//Using for-each loop
searchItems.forEach((item) => {
    test(`Search Tests ${item}`, async ({ page }) => {//${item} is to make the name unique, otherwise it through an error of duplicate title
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator("input#small-searchterms").fill(item);
        await page.locator("input[value='Search']").click();
        await expect(page.locator("h2.product-title a")).toContainText(item, { ignoreCase: true });
    })
})

//The same test block, will keep under group, since it is running 3tests which is doing same process

test.describe("Searching Products", async () => {
    searchItems.forEach((item) => {
        test(`Search Tests ${item}`, async ({ page }) => {
            await page.goto("https://demowebshop.tricentis.com/");
            await page.locator("input#small-searchterms").fill(item);
            await page.locator("input[value='Search']").click();
            await expect(page.locator("h2.product-title a")).toContainText(item, { ignoreCase: true });
        })
    })


})