import { test, expect, Locator } from '@playwright/test';

test('Sorted DropDowns', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dropdownOptions: Locator = page.locator('select#animals > option');
    console.log(await dropdownOptions.allTextContents());

const trimedOptions : string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());

const originalList = [...trimedOptions]; // [...] Create a copy of the original list to sort, so that we can compare it later. 
const sortedList = [...originalList].sort();

console.log("Original List: " + originalList);
console.log("Sorted List: " + sortedList);

expect(originalList).toEqual(sortedList);
    await page.waitForTimeout(5000);
})