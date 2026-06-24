// alert(), confirm() and prompt() are the three types of dialogs that can be handled in Playwright. 

import { test, expect, Page } from "@playwright/test";

test("Simple Dialog", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    //This should done before the action on dialog box, basically it is waiting for the dialog box to appear and then it will handle it.
    //By default, playwright will handle them and closes, but if we want to do some validation on dialog box, then we can use page.on() 
    //Register a dialog handler
    page.on('dialog', (dialog) => {
        console.log("Dialog Type : ", dialog.type());// It returns whether it is alert, confirm or prompt
        expect(dialog.type()).toBe("alert");
        console.log("Dialog Message : ", dialog.message());// It returns the message present in the dialog box
        expect(dialog.message()).toBe("I am an alert box!");
        dialog.accept();
    });

    await page.locator("button#alertBtn").first().click();

    await page.waitForTimeout(3000);


})

test("Confirmation Dialog", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log("Dialog Type : ", dialog.type());// It returns whether it is alert, confirm or prompt
        expect(dialog.type()).toContain("confirm");
        console.log("Dialog Message : ", dialog.message());// It returns the message present in the dialog box
        expect(dialog.message()).toBe("Press a button!");
        dialog.dismiss(); //click on Cancel Button
    });

    await page.locator("button#confirmBtn").first().click();
    const textMessage: string = await page.locator("p#demo").innerText();
    console.log("Text message after handling confirm dialog : ", textMessage);
    expect(textMessage).toContain("You pressed Cancel!");

    await page.waitForTimeout(3000);

})

test.only("Prompt Dialog", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log("Dialog Type : ", dialog.type());// It returns whether it is alert, confirm or prompt
        expect(dialog.type()).toContain("prompt");
        console.log("Dialog Message : ", dialog.message());// It returns the message present in the dialog box
        expect(dialog.message()).toBe("Please enter your name:");
        expect(dialog.defaultValue()).toContain("Harry Potter"); // defaultValue() returns the default value present in the prompt dialog input field

        dialog.accept('Dedeepya'); //click on Cancel Button
    });

    await page.locator("button#promptBtn").first().click();
    const textMessage: string = await page.locator("p#demo").innerText();
    console.log("Text message after handling confirm dialog : ", textMessage);
    expect(textMessage).toContain("Dedeepya"); // we need to pass the value in accept() method, which we want to enter in the prompt input field

    await page.waitForTimeout(3000);


})
