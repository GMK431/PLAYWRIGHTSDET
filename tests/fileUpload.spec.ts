import { test, expect } from '@playwright/test'


test("Single File Upload", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.locator("input#singleFileInput").setInputFiles("upload-files/ClassNotes.txt");
    await page.getByText("Upload Single File").click();
    const message = await page.locator("p#singleFileStatus").textContent();
    expect(message).toContain("ClassNotes.txt");
    console.log(".........Upload Succesful.........")

    await page.waitForTimeout(3000);
})


test.only("Multiple File Upload", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.locator("input#multipleFilesInput").setInputFiles(["upload-files/ClassNotes.txt", "upload-files/DOM.png", "upload-files/Playwright+Introduction.pdf"]);
    await page.getByText("Upload Multiple Files").click();
    const message = await page.locator("p#multipleFilesStatus").textContent();
    expect(message).toContain("ClassNotes.txt");
    expect(message).toContain("DOM.png");
    expect(message).toContain("Playwright+Introduction.pdf");
    console.log(".........Upload Succesful.........")

    await page.waitForTimeout(3000);
})