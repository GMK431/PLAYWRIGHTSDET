//TextBox
//Radio Buttons


import { test, expect, Locator } from '@playwright/test';

test('Playwright Actions', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Text box
    const nameTextBox: Locator = page.locator("input#name");
    await expect(nameTextBox).toBeVisible();
    await expect(nameTextBox).toBeEnabled();

    const placeholderOfTextBox: string | null = await nameTextBox.getAttribute("placeholder");
    expect(placeholderOfTextBox).toBe("Enter Name");

    await nameTextBox.fill("Dedeepya");
    const textEntered: string | null = await nameTextBox.textContent(); // It returns empty since its not appear in DOM, instead use inputValue
    console.log("Text entered in text box: " + textEntered);
    const textInputValue: string = await nameTextBox.inputValue()
    console.log("Input entered in text box: " + textInputValue);
    expect(textInputValue).toBe("Dedeepya");

    await page.waitForTimeout(3000);
})

test('Radio Button', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const femaleRadioButton: Locator = page.locator("input#female");
    await expect(femaleRadioButton).toBeVisible();
    await expect(femaleRadioButton).toBeEnabled();


    expect(await femaleRadioButton.isChecked()).toBe(false);

    await femaleRadioButton.check();
    expect(await femaleRadioButton.isChecked()).toBe(true); // correct only but not best practice, better to use toBeChecked assertion
    expect(femaleRadioButton).toBeChecked(); // best practice to check radio button is checked or not

    await page.waitForTimeout(3000);
})

test.only('CheckBox', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    //Select particular checkbox
    const sundayLabel: Locator = page.getByLabel("Sunday");
    // await sundayLabel.check();
    // expect(sundayLabel).toBeChecked();

    //Select all checkboxes and assert each one of them
    const daysLabels: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const checkboxes: Locator[] = daysLabels.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    for (let checkbox of checkboxes) {
        await checkbox.check();
        expect(checkbox).toBeChecked();
    }

    //Uncheck only last 3 checkboxes and assert them
    for (const ofCheckboxes of checkboxes.slice(-3)) {
        await ofCheckboxes.uncheck();
        expect(ofCheckboxes).not.toBeChecked();
    }

    //Uncheck the checked and check the unchecked checkboxes and assert them
    for (const checkbox of checkboxes) {
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            expect(checkbox).toBeChecked();
        }
    }

    //Randomly select 3 checkboxes which are 1,3,6 and assert them
    const randomIndexes: number[] = [1, 3, 6];
    for (const index of randomIndexes) {
        await checkboxes[index].check();
       await expect(checkboxes[index]).toBeChecked();
       
    }

    //select checkbox with label name and assert it
    const weekNameLabel : string ='Sunday';

    for(const label of daysLabels){
        if(label === weekNameLabel){
            const checkbox : Locator = page.getByLabel(label);
            await checkbox.check();
            expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(3000);
})