import {test, expect, Locator} from '@playwright/test';

test("Dynamic Web Table", async ({page}) => {

    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table : Locator = page.locator("table.table tbody");
    await expect(table).toBeVisible();

    //step1 : Get value of CPU Load for chrome
    const rows : Locator[] = await table.locator("tr").all();
    expect(rows).toHaveLength(4);

    let cpuLoad ='';
for(let row of rows){
    const rowText : string = await row.locator("td").nth(0).innerText();

    if(rowText === "Chrome"){
        cpuLoad = await row.locator("td:has-text('%')").innerText();
        console.log("CPU Load for Chrome is : ", cpuLoad);
        break;
    }
}

//step 2 : Compare value with yellow label
const yellowLabel :string = await page.locator("chrome-cpu").innerText();

if(yellowLabel.includes(cpuLoad)){
    console.log("CPU Load value is matching with yellow label");
}else{
    console.log("CPU Load value is NOT matching with yellow label");
}

expect(yellowLabel).toContain(cpuLoad);
await page.waitForTimeout(5000);

})