/*
tag with ID - tag#id
tag with class - tag.class  
tag with attribute - tag[attribute='value']
tag with class and attribute - tag.class[attribute='value']
*/


import {test,expect, Locator} from '@playwright/test';

test('CSS Locators', async({page})=>{

page.goto("https://demowebshop.tricentis.com/");

//tag with ID
const searchTextBox : Locator = page.locator("input#small-searchterms");
await expect(searchTextBox).toHaveAttribute('value','Search store');
await searchTextBox.fill("Laptop");

//tag with class
const searchButton = await page.locator("input.search-box-text ui-autocomplete-input valid").fill("Laptop");

//tag with attribute
await page.locator("input[type='submit']").click();

//tag with class and attribute

await page.locator("input.search-box-text[value='Search store']").fill("Laptop");

//start with need to use ^ for that
// Here class name is ico-register, but ico-r will work if we provide ^
page.locator("a[class^='ico-r']");


//end with need to use $ for that
// Here class name is ico-register, but ter will work if we provide $
page.locator("a[class$='ter']");


//contains need to use * for that
// Here class name is ico-register, but o-reg will work if we provide *
page.locator("a[class*='o-reg']");


})