import {test, expect} from '@playwright/test';


test('Sample Test',async ({page})=>{

    await page.goto('https://www.google.com/');

    await expect(page).toHaveTitle(/Google/); // regular expression, it will check if the title contains Google or not 
    // and befoe and after it can have any other text.


})