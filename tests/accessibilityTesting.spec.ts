import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'


test("Accessibility Test", async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");

    // Scanning and detect all types of WCAG violations
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    console.log(accessibilityScanResults);
    console.log("No. of violations : ", accessibilityScanResults.violations.length);
    expect.soft(accessibilityScanResults.violations.length).toEqual(0); // It fails, bcoz page has violations

    //Scanning only few WCAG violations
    const accessibilityScanResults1 = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

    expect.soft(accessibilityScanResults1.violations).toEqual([]);
})


test("Accessibility Test to export file", async ({ page }, testInfo) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).withRules(['duplicate-id']).analyze();// It only takes consideration, any ele
                                                                        //has duplicate id's

    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json' // To get the whole violations in file of json
    });

    expect(accessibilityScanResults.violations).toEqual([]);

})


// https://www.w3.org ---> This page has no violations