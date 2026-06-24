import {test, expect, Locator} from '@playwright/test';

test('xpath Methods', async({page}) => {

    await page.goto("https://www.amazon.in/");

    //last()
    await page.getByPlaceholder("Search Amazon.in").fill("mobile");
    const lastElement : Locator = page.locator("(//div[@class='s-suggestion-container']//span[@class='s-heavy'])[last()]");
    const lastElementText : any = await lastElement.textContent();
    console.log("Last element text: " + lastElementText);


    //position()
    const thirdElement : any = await page.locator("(//div[@class='s-suggestion-container']//span[@class='s-heavy'])[position()=3]").textContent();
    console.log("Third element text: " + thirdElement);
})











