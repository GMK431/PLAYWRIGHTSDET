/*
only -Only that test will run
skip - That test will be skipped
fail - Intentionally failing. May be can use for flaky test
fixme - Partially completed the coding for test. So, it will also get skip 
slow - triple the timeout --> default have 30sec, so it waits for 90sec
*/

import { test, expect, Page } from '@playwright/test'


test("Launch Chrome", async ({ page }) => {

    await page.goto("https://www.google.com/");
    console.log("Launched Google");
})

test.skip("Launch Firefox", async ({ page }) => {
    await page.goto("https://www.firefox.com/en-US/");
    console.log("Launched Firefox");
})

test.fail("Fail Launch Firefox", async ({ page }) => {
    await page.goto("https://www.firefox.com/en-US/");
    console.log("Launched Firefox");
})

test.fixme("Fix Launch Firefox", async ({ page }) => {
    await page.goto("https://www.firefox.com/en-US/");
    console.log("Launched Firefox");
})
test("Slow Launch Chrome", async ({ page }) => {
    test.slow(); 
    await page.goto("https://www.google.com/");
    expect(page.title()).toEqual("Google");
    console.log("Launched Google");
})