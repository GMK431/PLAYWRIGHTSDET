//ctrl+shift+P on DOM -> Use Emulate on focused page

import { test, expect, Locator } from '@playwright/test';

test('Autosuggest DropDowns', async ({ page }) => {

    await page.goto("https://www.flipkart.com/");

    await page.locator("input[name='q']").first().fill('smart');
    await page.waitForTimeout(5000);

    const autoSuggestOptions: Locator = page.locator("ul>li");
    const count = await autoSuggestOptions.count();

    //printing all options in auto suggest dropdown
    console.log("Total options in auto suggest dropdown: " + count);
    console.log("Options in auto suggest dropdown: ");
    for (let i = 0; i < count; i++) {

        console.log(await autoSuggestOptions.nth(i).textContent());
    }

    //select on particular option from auto suggest dropdown
    for (let i = 0; i < count; i++) {

        const text = await autoSuggestOptions.nth(i).textContent();
        if (text == "smart watch") {
            await autoSuggestOptions.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(5000);
})