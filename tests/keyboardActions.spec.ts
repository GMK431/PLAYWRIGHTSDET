/*
InsertText
down
press
type
up
*/
import { test, expect } from '@playwright/test'

//Approach 1 ---> Not much recommended
test("Keyboard Actions", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");

    /* 1. Focus on Input1
    2. Provide text toinput1
    3. Ctrl+A select the text
    4. Ctrl+C copy the text
    5. press TAB - 2times
    6. Ctrl+V -paste the text in input2
    7. press TAB - 2times
    8. Ctrl+V -paste the text in input3
    */

    // Our cursor should go to our element
    const inputBox1 = await page.locator("input#input1").focus(); // we can click also instead od focus

    //Provide text toinput1
    await page.keyboard.insertText("Welcome");

    //Ctrl+A select the text
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');

    //Ctrl+C to input1
    await page.keyboard.down('Control');
    await page.keyboard.press('C');
    await page.keyboard.up('Control');

    //press TAB - 2times
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    //Ctrl+V -paste the text in input2
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    //press TAB - 2times
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    //Ctrl+V -paste the text in input3
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.waitForTimeout(5000);
})

//Recommended
test.only("Keyboard Actions Recommended", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");


    const inputBox1 = await page.locator("input#input1").focus(); // we can click also instead od focus


    await page.keyboard.insertText("Welcome");
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Control+C");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await page.keyboard.press("Control+V");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await page.keyboard.press("Control+V");

    await page.waitForTimeout(5000);
})