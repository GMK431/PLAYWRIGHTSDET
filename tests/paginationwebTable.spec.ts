import { test, expect, Locator } from '@playwright/test';

test("Pagination Web Table", async ({ page }) => {

    //Read data from all pages of webtable
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasmorePages: boolean = true;

    while (hasmorePages) {
        const rows: Locator[] = await page.locator("#example tbody tr").all();
        for (let row of rows) {
            console.log(await row.innerText());
        }
        const nextButton = page.locator("button[aria-label='Next']");
        if (await nextButton.isEnabled()) {
            await nextButton.click();
        } else {
            hasmorePages = false;
        }

    }
})

//Filter data from webtable and check rows count
test("Filter and read data from webtable", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropdown: Locator = page.locator("select#dt-length-0");
    await dropdown.selectOption("25");

    const rows: Locator[] = await page.locator("#example tbody tr").all();
    expect(rows).toHaveLength(25);

    const tableInfo = await page.locator("div#example_info").innerText();
    console.log("Table info: " + tableInfo);
    expect(tableInfo).toBe("Showing 1 to 25 of 57 entries");

})

//Search for specific data in webtable
test.only("Search and read data from webtable", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchBox = await page.locator("input#dt-search-0").fill("Michael ");

    const rows: Locator[] = await page.locator("#example tbody tr").all();

    if (rows.length >= 1) {
        
        let matchFound: boolean = false;
        for (let row of rows) {
            const rowText: string = await row.innerText();
            if (rowText.includes("Michael ")) {
                matchFound = true;
            }
            expect(matchFound).toBeTruthy();
        }
    } else {
        console.log("No match found");
    }
})