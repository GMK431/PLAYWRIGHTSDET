//regression
//sanity
//smoke


//By referring tags we can run tests
// npx playwright test tagging.spec.ts --grep "@sanity"  - To run single tag
//npx playwright test tagging.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"  ---> Both Sanity and Regression
//npx playwright test tagging.spec.ts --grep "@sanity|@regression" ---> Sanity or Regression
//npx playwright test tagging.spec.ts --grep-invert "@sanity" ---> Otherthan Sanity 
//npx playwright test tagging.spec.ts --grep "@sanity" --grep-invert "@regression"- Only sanity which arent included with other tags

import { test, expect } from '@playwright/test'

//Appraoch 1
test("@sanity @regression Launch Chrome", async ({ page }) => {
    test.slow();
    await page.goto("https://www.google.com/");
    expect(await page.title()).toEqual("Google");
    console.log("Launched Google");
})

//Approach 2 --> Preferrable
//For single tag
test("Launch Chrome", { tag: '@sanity' }, async ({ page }) => {
    test.slow();
    await page.goto("https://www.google.com/");
    expect(await page.title()).toEqual("Google");
    console.log("Launched Google");
})

//For single tag
test("Click Store", { tag: '@regression' }, async ({ page }) => {
    test.slow();
    await page.goto("https://www.google.com/");
    expect(await page.title()).toEqual("Google");
    console.log("Launched Google");
    await page.getByText("Store").click();
})

//For Multiple tags
test("Check top recommendations", { tag: ['@sanity', '@regression'] }, async ({ page }) => {
    await page.goto("https://www.google.com/");
    await page.getByText("Store").click();
    await expect(page.getByText("Popular on the Google Store.")).toContainText("Google Store.");

})
