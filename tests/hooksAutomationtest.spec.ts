import { test, expect, Page } from '@playwright/test';
/*Open App --BeforeAll
Login -Beforeeach
Find products
Logout */

/*Login
Add product to cart
Logout
Close App */

let page: Page; // Since page uses globally, we declared outside of test.

test.beforeAll("Launch Application", async ({ browser }) => {

    page = await browser.newPage();
    await page.goto("https://www.demoblaze.com/index.html");
})

test.afterAll("Close Application", async () => {

    await page.close();
})

test.beforeEach("Login", async () => {

    await page.locator("a#login2").click();

    await page.locator("#loginusername").fill("pavanol");
    await page.locator("#loginpassword").fill("test@123");
    await page.locator("button[onclick='logIn()']").click();
    await page.waitForTimeout(2000);
})

test.afterEach("Logout", async () => {

    await page.locator("a#logout2").click();
})

//I have mentioned all my tests in "Test Scenario group" and hooks in outside. So, hooks will be applicable to whole file not just for group.
// But hooks defined under group only to that particular group it will be available.
// Best practice ---> define outside group.
test.describe("Test Scenario", async () => {
    test("Find Products", async () => {

        const products = page.locator("div#tbodyid .hrefch");
        const productsCount = await products.count();
        console.log("No. of Products : ", productsCount);
        expect(products).toHaveCount(9);
    })

    test("Add to Cart", async () => {
        page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

        //Handle dialog before click on Add to Cart
        page.once('dialog', async (dialog) => {
            expect(dialog.message()).toContain("Product added.");
            await dialog.accept();
        })

        await page.locator("a.btn").click();
    })
})

