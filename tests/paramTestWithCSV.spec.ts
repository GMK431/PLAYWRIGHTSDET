//prerequisite : npm install csv-parse
import { test, expect } from '@playwright/test'
import fs from 'fs';
import {parse} from 'csv-parse/sync'


//Read data from login.Json file
const csvPath = 'test-data/loginData.csv';
const fileContent = fs.readFileSync(csvPath,'utf-8'); 

const loginTestRecords = parse(fileContent,{columns:true,skip_empty_lines:true}) as Array<{email:string,password:string,validity:string}> //Will read file content and gives in rows and columns

test.describe("Login Data-Driven Test", async () => {
    
    for (const data of loginTestRecords) {
        test(`Login Test for ${data.email} and ${data.password}`, async ({ page }) => {

            await page.goto("https://demowebshop.tricentis.com/");

            await page.locator("a.ico-login").click();
            //Fill login
            await page.locator("input#Email").fill(data.email);
            await page.locator("input#Password").fill(data.password);
            await page.locator("input[value='Log in']").click();

            if (data.validity.toLowerCase() == 'valid') {
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
