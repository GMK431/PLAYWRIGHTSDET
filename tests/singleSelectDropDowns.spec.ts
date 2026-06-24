import { test, expect, Locator } from '@playwright/test';

test('Single Select DropDowns', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Select option from dropdown(4 ways)

    //1. select by visible text
    //await page.locator("select#country").selectOption("India");
    //2. select by value attribute
    //await page.locator("select#country").selectOption({ value: 'india' });
    //3. select by label
    //await page.locator("select#country").selectOption({ label: 'United States' });
    //4. select by index
    //await page.locator("select#country").selectOption({ index: 5 });

    //count the options
    const dropDownOptions: Locator = page.locator("select#country > option");
    await expect(dropDownOptions).toHaveCount(10);


    //check whether particular option is present in dropdown or not
    const textOfDropdownOptions: string[] = (await dropDownOptions.allTextContents()).map(text => text.trim());
    console.log(textOfDropdownOptions);
    expect(textOfDropdownOptions).toContain("Canada");


    await page.waitForTimeout(5000);
})