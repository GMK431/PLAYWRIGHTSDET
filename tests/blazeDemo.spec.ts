import { test, expect, Locator } from '@playwright/test';

test("BlazeDemo", async ({ page }) => {
    await page.goto("https://blazedemo.com/");

    const welcomeText: Locator = page.locator("h1").first();
    await expect(welcomeText).toHaveText("Welcome to the Simple Travel Agency!");

    const depCity: Locator = page.locator("select[name ='fromPort']");
    depCity.selectOption("Boston");

    const desCity: Locator = page.locator("select[name ='toPort']");
    desCity.selectOption("New York");

    const findFlightsButton = await page.locator("input[type='submit']").click();

    //2nd Page
    //Get all rows and Sort prices
    const rows: Locator[] = await page.locator("table tbody tr").all();
    const prices = [];
    for (let row of rows) {
        const priceText: string = await row.locator("td").nth(5).innerText();
        prices.push(priceText);
        console.log("Price: " + priceText);
    }

    const sortedPrices = prices.sort();
    console.log("Lowest Price of all flights", sortedPrices[0]);

    //click on the flight with lowest price
    for (let row of rows) {
        const priceText: string = await row.locator("td").nth(5).innerText();
        if (priceText === sortedPrices[0]) {
            row.locator("td").nth(0).click();
            break;
        }
    }

    //3rd Page
    const firstName = page.locator("input#inputName");
    await firstName.fill("Dedeepya");
    const address = page.locator("input#address")
    await address.fill("Bachupally");
    const city = page.locator("input#city");
    await city.fill("Hyderabad");
    const state = page.locator("input#state")
    await state.fill("Telangana");
    const zipCode = page.locator("input#zipCode");
    await zipCode.fill("500090");

    const cardType = await page.locator("select#cardType").selectOption("American Express");

    //Assertions
    expect(await firstName.inputValue()).toBe("Dedeepya");
    expect(await address.inputValue()).toBe("Bachupally");
    expect(await city.inputValue()).toBe("Hyderabad");
    expect(await state.inputValue()).toBe("Telangana");
    expect(await zipCode.inputValue()).toBe("500090");
    
    console.log("Assertions for form fields passed successfully");

    const submitButton = page.locator("input[type='submit']").click();

    //4th Page
    const confirmationMessage = page.locator("h1").first();
    await expect(confirmationMessage).toHaveText("Thank you for your purchase today!");


    await page.waitForTimeout(3000);
})