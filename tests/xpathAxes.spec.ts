import { test, expect, Locator } from '@playwright/test';

test("xpath Axes", async ({ page }) => {

    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //self  -> It selects the current node itself. It is used to refer to the current element in the context of an XPath expression.
    // selecting Germany
    const germanyCell: Locator = page.locator("//td[text()='Germany']/self::td");
    await expect(germanyCell).toHaveText("Germany");

    //parent -> It selects the parent node of the current node. 
    //want to select parent of gernamy
    const parentRow: Locator = page.locator("//td[text()='Germany']/parent::tr");
    console.log("Parent row text: " + await parentRow.textContent());
    await expect(parentRow).toContainText("Alfreds Futterkiste Maria Anders Germany");

    //child -> It selects the child nodes of the current node. 
    //selects td from 2nd row which is tr
    const secondRowCells: Locator = page.locator("//table[@id='customers']//tr[2]/child::td");
    expect(secondRowCells).toHaveCount(3);

    //ancestor -> It selects all the ancestor nodes of the current node.
    //selecting all ancestors of germany cell
    const table:Locator = page.locator("//td[text()='Germany']/ancestor::table");
    await expect(table).toHaveAttribute('id','customers');


    //descendant -> It selects all the descendant nodes of the current node.
    //get all td under table
    const allCellsUnderTable : Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(allCellsUnderTable).toHaveCount(18);

    //following -> It selects all the nodes that come after the current node in the document, regardless of their level in the hierarchy.
    //select td which comes after germany cell
    const followingCells : Locator = page.locator("//td[text()='Germany']/following::td[1]");
    await expect(followingCells).toHaveText("Centro comercial Moctezuma");

    //following-sibling -> It selects all the sibling nodes that come after the current node.
    //selects td which is sibling of germany cell
    const followingSibling : Locator = page.locator("//td[text()='Germany']/following-sibling::td");
    await expect(followingSibling).toHaveCount(0);

    //preceding -> It selects all the nodes that come before the current node in the document, regardless of their level in the hierarchy.
    //select td which comes before germany cell
    const precedingCells : Locator = page.locator("//td[text()='Germany']/preceding::td[1]");
    await expect(precedingCells).toHaveText("Maria Anders");

    //preceding-sibling -> It selects all the sibling nodes that come before the current node.
    //select td which is sibling of germany cell
    const precedingSibling : Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    await expect(precedingSibling).toHaveCount(2);
    await expect(precedingSibling.nth(0)).toHaveText("Alfreds Futterkiste");
    await expect(precedingSibling.nth(1)).toHaveText("Maria Anders");

})