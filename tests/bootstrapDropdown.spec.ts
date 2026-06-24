import { test, expect, Locator } from '@playwright/test';

test('Autosuggest DropDowns', async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //Login steps
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button[type='submit']").click();

    await page.waitForTimeout(5000);
    await page.getByText("PIM").click();
    await page.waitForTimeout(2000);
    //clicked on job title dropdown
    page.locator("form i").nth(2).click();

    await page.waitForTimeout(5000);
    const options: Locator = page.locator("div[role='listbox'] span");
    const countOfOptions: number = await options.count();

    console.log("Total options in dropdown: " + countOfOptions);

    //printing all options in dropdown
    for(let i=0; i<countOfOptions; i++){

        console.log(await options.nth(i).textContent());
    }

    //selecting on particular option from dropdown
    for(let i=0; i<countOfOptions; i++){
        const text = await options.nth(i).textContent();
        if(text == "Automation Tester"){
            await options.nth(i).click();
            break;
        }

    }


})