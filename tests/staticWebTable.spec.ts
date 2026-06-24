import { test, expect, Locator } from '@playwright/test';

test("Static Web Table", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator("table[name='BookTable'] tbody");

    await expect(table).toBeVisible();

    //Count number of rows in table
    //1st approach
    const rowCount: Locator = page.locator("table[name='BookTable'] tbody tr");
    await expect(rowCount).toHaveCount(7);

    //2nd approach
    const rowCount2: number = await table.locator("tr").count();
    expect(rowCount2).toBe(7);


    //Count number of columns in table
    const columnCount: number = await rowCount.locator("th").count();

    console.log("Column count is : ", columnCount);
    expect(columnCount).toBe(4);


    //Read 2nd row
    const secondRow: Locator = rowCount.nth(1).locator("td");
    const secondRowText: string[] = await secondRow.allInnerTexts();

    console.log("Printing 2nd row data : ", secondRowText);
    expect(secondRowText).toStrictEqual(['Learn Selenium', 'Amit', 'Selenium', '300']);

    //Read all data exclusing header
    const rowLocatorAll: Locator[] = await rowCount.all();

    for (let row of rowLocatorAll.slice(1)) { // we are slicing to exclude header row
        const rowData: string[] = await row.locator("td").allInnerTexts();
        console.log(" Row data : ", rowData);
    }


    //print Bookname whose author is Mukesh
    console.log("Book name whose author is Mukesh : ");
    const mukeshBooks: string[] = [];
    for (let row of rowLocatorAll.slice(1)) {
        const cells: string[] = await row.locator("td").allInnerTexts();

        if (cells[1] === "Mukesh") { //cells[1] is author column
            console.log(cells[0]);//cells[0] is book name column
            mukeshBooks.push(cells[0]);
        }
    }
    expect(mukeshBooks).toHaveLength(2);

    //Total price of all books
    let totalPrice: number = 0;
    for (let row of rowLocatorAll.slice(1)) {
        const cells: string[] = await row.locator("td").allInnerTexts();
        const price: string = cells[3];

        totalPrice = totalPrice + parseInt(price);
    }
    console.log(totalPrice);
    expect(totalPrice).toBe(7100);
})