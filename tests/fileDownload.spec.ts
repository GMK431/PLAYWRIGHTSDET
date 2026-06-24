import { test, expect } from '@playwright/test'
import fs from 'fs';

test("File Download", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");

    await page.locator("#inputText").fill("Dedeepya"); //Filling text in Input field
    await page.locator("button#generateTxt").click(); // Click on Generate and Download Text File button

    // This is basically trigerring an event where we need to wait and run both in parallel
    const [download] = await Promise.all([page.waitForEvent("download"), page.locator("a#txtDownloadLink").click()])

    //Save the file 
    const downloadPath = 'download-files/TextFile.txt';
    await download.saveAs(downloadPath);

    //check if file is downloaded to path
    const fileExists = fs.existsSync(downloadPath); // It returns a boolean value . true means file exists
    expect(fileExists).toBeTruthy();

    //Cleanup downloaded files ---> Deletes the downloaded files
    if (fileExists) {
        fs.unlinkSync(downloadPath);
    }
    await page.waitForTimeout(5000);
})


test.only("PDF File Download", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");

    await page.locator("#inputText").fill("Dedeepya"); //Filling text in Input field
    await page.locator("button#generatePdf").click(); // Click on Generate and Download Text File button
    // This is basically trigerring an event where we need to wait and run both in parallel
    const [download] = await Promise.all([page.waitForEvent("download"), page.locator("a#pdfDownloadLink").click()])

    //Save the file 
    const downloadPath = 'download-files/TextFile.Pdf';
    await download.saveAs(downloadPath);

    //check if file is downloaded to path
    const fileExists = fs.existsSync(downloadPath); // It returns a boolean value . true means file exists
    expect(fileExists).toBeTruthy();

    //Cleanup downloaded files ---> Deletes the downloaded files
    if (fileExists) {
        fs.unlinkSync(downloadPath);
    }
    await page.waitForTimeout(5000);
})