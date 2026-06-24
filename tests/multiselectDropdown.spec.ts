import { test, expect, Locator } from '@playwright/test';

test('Multiselect DropDowns', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    page.locator("select#colors");

    //Select multiple options from dropdown(4 ways)
    //1. select by visible text
    page.locator("select#colors").selectOption(["Red", "Blue", "Green"]);
    //2. select by value attribute
    page.locator("select#colors").selectOption([{ value: 'red' }, { value: 'blue' }, { value: 'green' }]);
    //3. select by label
    page.locator("select#colors").selectOption([{ label: 'Green' }, { label: 'Yellow' }]);
    //4. select by index
    page.locator("select#colors").selectOption([{ index: 0 }, { index: 1 }, { index: 4 }]);

    //count the options
    const dropDownOptions: Locator = page.locator("select#colors > option");
    await expect(dropDownOptions).toHaveCount(7);

    //check whether particular option is present in dropdown or not
    const textOfDropdownOptions: string[] = (await dropDownOptions.allTextContents()).map(text => text.trim());
    console.log(textOfDropdownOptions);
    expect(textOfDropdownOptions).toContain("Yellow");

    //print all selected options
    for(let i of textOfDropdownOptions){
        console.log(i);
    }
    await page.waitForTimeout(5000);
})