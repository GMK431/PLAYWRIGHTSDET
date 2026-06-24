import { test, expect } from '@playwright/test'

//Mouse Hover
test("Mouse Actions", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const pointme = page.locator("button.dropbtn");
    await pointme.hover();
    const laptops = await page.locator("div.dropdown-content a").nth(1).hover();

    await page.waitForTimeout(5000);

})

//Mouse - Right Click
test("Mouse Right Click", async ({ page }) => {

    await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");

    const button = page.locator("span.context-menu-one");
    button.click({ button: 'right' });
    await page.waitForTimeout(5000);

})

//Double click
test("Mouse Double Click", async ({ page }) => {

    await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");

    const copyTextButton = page.getByText("Copy Text");
    await copyTextButton.dblclick();

    const field1 = page.locator("input#field1");
    const field1Text = await field1.inputValue();

    const field2 = page.locator("input#field2");
    const field2Text = await field2.inputValue();

    expect(field1Text).toEqual(field2Text);

})

test.only("Drag and Drop", async ({ page }) => {


    await page.goto("https://codepen.io/EpsilonDeltaCriterion/pen/jLoPgE");

    const rome = page.locator("div#box6");
    const italy = page.locator("div#box106");


    //Approach 1 --Not recommended
    await rome.hover();
    await page.mouse.down();
    await italy.hover();
    await page.mouse.up();


    //Approach 2 ---- recommended
    const washington = page.locator("div#box3");
    const usa = page.locator("#box103");

    await washington.dragTo(usa); //Drag and Drop



})
