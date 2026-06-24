import { test, expect } from '@playwright/test'

test("Test 1", async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");

    //Approach 1 --> We can give name of screenshot -->Recommended
    expect(await page.screenshot()).toMatchSnapshot("homepage.png"); // It takes screenshot and compares. First time it fails

    //Approach 2  --> We can't give name of screenshot
    //await expect(page).toHaveScreenshot(); // It do both job, takes screenshot and compare


    //Compare snapshot of the element
    const logo = page.getByAltText('Tricentis Demo Web Shop');
    expect(await logo.screenshot()).toMatchSnapshot("logo.png");

})