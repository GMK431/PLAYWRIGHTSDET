//prerequisite : npm install xlsx
import { test, expect } from '@playwright/test'
import fs from 'fs';
import * as XLSX from 'xlsx';


//Read data from Excel
//File --> Workbook --> Sheets --> rows& Columns

const xlsxPath = 'test-data/loginData.xlsx';
const workbook = XLSX.readFile(xlsxPath);
const sheetNames = workbook.SheetNames[0];
const workSheet = workbook.Sheets[sheetNames];

//Convert worksheet into json

const loginTestRecords: any = XLSX.utils.sheet_to_json(workSheet);

test.describe("Login Data-Driven Test", async () => {

    for (const { email, password, validity } of loginTestRecords) {
        test(`Login Test for ${email} and ${password}`, async ({ page }) => {

            await page.goto("https://demowebshop.tricentis.com/");

            await page.locator("a.ico-login").click();
            //Fill login
            await page.locator("input#Email").fill(email);
            await page.locator("input#Password").fill(password);
            await page.locator("input[value='Log in']").click();

            if (validity.toLowerCase() == 'valid') {
                const logoutLink = page.locator("a.ico-logout");
                expect(logoutLink).toBeVisible({ timeout: 5000 });
            } else {
                const errorMessage = page.locator("div.validation-summary-errors");
                expect(errorMessage).toBeVisible({ timeout: 5000 });

                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
            }

        })
    }
})
