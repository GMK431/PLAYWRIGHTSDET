import { test, expect } from '@playwright/test'
import fs from 'fs';
//Read data from login.Json file

const jsonPath = 'E:/Playwright SDET/test-data/login.json';
const loginTestData= JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

test.describe("Login Data-Driven Test", async () => {
    for (const { email, password, validity } of loginTestData) { //Since it is 2 dimension, by writing 2 loops, we can write like this
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
