import { test, expect, Locator, Frame } from "@playwright/test";

test('Frames Demo', async ({ page }) => {

    await page.goto("https://demo.automationtesting.in/Frames.html");

    //total frames on page
    const frames = page.frames();
    console.log("Total frames on page : ", frames.length);

    //Selecting frame
    //Approach 1. Using page.frame() method -> Can pass only name, url or title to identify the frame

    const frame = page.frame({ url: "https://demo.automationtesting.in/SingleFrame.html" });

    if (frame) {
        await frame.locator("input[type='text']").fill("Dedeepya");

        expect(await frame.locator("input[type='text']").inputValue()).toBe("Dedeepya");
    } else {
        console.log("Frame not found");
    }

    //Approach 2. Using frame locator -> It is more powerful compared to page.frame() method, as it allows to use any selector to identify the frame
    const inputBox = page.frameLocator("iframe[src='SingleFrame.html']").locator("input[type='text']");
    await inputBox.fill("Dedeepya")
    expect(await inputBox.inputValue()).toBe("Dedeepya");

    await page.waitForTimeout(3000);

})


test.only('Inner Frames Demo', async ({ page }) => {

    await page.goto("https://demo.automationtesting.in/Frames.html");

    await page.locator("a[href='#Multiple']").click();

    //total frames on page
    const frames = page.frames();
    console.log("Total frames on page : ", frames.length);

    const parentFrame = page.frame({ url: "https://demo.automationtesting.in/MultipleFrames.html" });
    if (parentFrame) {
        const childFrames = parentFrame.childFrames(); // to get all child frames of parent frame

        console.log("Child frames count : ", childFrames.length);

        await childFrames[0].locator("input[type='text']").fill("Dedeepya");

        expect(await childFrames[0].locator("input[type='text']").inputValue()).toBe("Dedeepya");
    } else {
        console.log("Parent frame not found");
    }


    await page.waitForTimeout(3000);

})
