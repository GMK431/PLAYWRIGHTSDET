import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test'

test("Browser Settings", async () => {

    const browser: Browser = await chromium.launch({ headless: false });
    const browserContext: BrowserContext = await browser.newContext({

        viewport: { width: 1280, height: 720 },
        locale: 'en-US', // Whenever there is any other language, it displays in english
        //proxy : {server : 'http://myproxy.com:8080'}, // Middle layer b/w client and server, whenever the sensitive info shouldnt shared to
        // client. Then proxy introduced. By this, it will hit the original url which is given
        // in goto() method.
        ignoreHTTPSErrors: true // Before making this option, the site isnt opening. So, we need to ignore so that we can launch

    });
    const page: Page = await browserContext.newPage();

    //await page.goto("https://www.google.com/");
    await page.goto("https://expired.badssl.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("expired.badssl.com");

    await page.waitForTimeout(5000);

})


test.only("Browser Cookies", async () => {

    const browser: Browser = await chromium.launch({ headless: false });
    const browserContext: BrowserContext = await browser.newContext();
    const page: Page = await browserContext.newPage();

    browserContext.addCookies([
        { name: 'myCookie', value: '1234', url: 'https://testautomationpractice.blogspot.com/' }
    ]);

    console.log("Cookies added.....")
    await page.goto("https://testautomationpractice.blogspot.com/");


    //Get cookie details by name
    const allcookies = await browserContext.cookies();
    const retrievedCookie = allcookies.find((i) => i.name = 'myCookie');

    console.log("Cookie Details: ", retrievedCookie);
    expect(retrievedCookie?.value).toBe("1234");
    expect(retrievedCookie).toBeDefined(); // return type can be particular value or undefined. so, checking our cookie is defined


    //Get all cookies --> our cookies as well as browser created cookies
    console.log("All cookies :", allcookies.length)
    expect(allcookies.length).toBeGreaterThan(0);

    console.log("Print all cookies")

    for (const i of allcookies)
        console.log(`${i.name} : ${i.value}`);
    await page.waitForTimeout(2000);

    //Clear cookies
    await browserContext.clearCookies();
    const allcookiess = await browserContext.cookies();
    console.log("Cookies after clear :", allcookiess.length)
    expect(allcookiess.length).toBe(0);

})