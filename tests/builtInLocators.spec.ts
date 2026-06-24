/*page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/

import {test, expect, Locator} from '@playwright/test';

test("Verify Built-in Locators", async ({page}) => {

   await page.goto("https://demo.nopcommerce.com/");

//page.getByAltText() -> Mostly used for images, it locates an element by its alt attribute.
    const logo : Locator = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();

//page.getText() -> It locates an element by its text content or visible text.
// Non interactive elements like div, span, p, etc. can be located using getByText().
//Can give exact text, partial text or regular expression
    const welcomeText : Locator = page.getByText("Welcome to our store");
    await expect(welcomeText).toBeVisible();
// We want to give text as case insensitive, need to give / at before and after text and i at the end of text, it will ignore case sensitivity.
    const welcomeText2 : Locator = page.getByText(/welcome to our store/i);
    await expect(welcomeText2).toBeVisible();

//page.getByRole() -> It locates an element by its role and accessible name. It is based on ARIA roles and attributes, 
// which are used to improve accessibility of web content. It can locate both interactive and non-interactive elements.

    await page.getByRole("link",{name:'Register'}).click();
    //const RegHeading : Locator =  page.getByRole("heading",{name : 'Register'});
    await expect(page.getByRole("heading",{name : 'Register'})).toBeVisible();

//page.getByLabel() -> It locates a form control by the text of its associated label. 
// It is useful for locating input fields, select boxes, and other form elements based on their labels.
    await page.getByLabel('FirstName').fill("Dedeepya");
    await page.getByLabel('LastName').fill("Siddabathuni");
    await page.getByLabel('Email').fill("abc@gmail.com");


//page.getByPlaceholder() -> Best for input fields

    await page.getByPlaceholder("Search store").fill("Apple MacBook Pro 13-inch");

//page.getByTitle() -> It locates an element by its title attribute. The title attribute is 
// often used to provide additional information about an element, and this locator can be useful for finding elements that have descriptive titles.

    await page.getByTitle("nopCommerce demo store. Home page title");

//page.getByTestId() -> It locates an element based on its data-testid attribute.

    await expect(page.getByTestId("profile-email")).toHaveText("Email");












})