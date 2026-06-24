import { test, expect, Locator } from '@playwright/test';

test('Duplicate DropDowns', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const colorsOptions: Locator = page.locator("select#colors > option");
    const optionsText: string[] = (await colorsOptions.allTextContents()).map(text => text.trim());

    const myset = new Set<string>();
    const duplicateOptions: string[] = [];

    for (let option of optionsText) {
        if (myset.has(option)) {
            duplicateOptions.push(option);
        } else {
            myset.add(option);
        }
    }

   console.log("Duplicate options in dropdown: " + duplicateOptions);


})