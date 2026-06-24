import { test, expect } from '@playwright/test'

import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'

test("User Login- Add product to Cart", async ({ page }) => {

    await page.goto("https://www.demoblaze.com/index.html");

    //Login Page
    const loginPage = new LoginPage(page);
    await loginPage.performLogin("pavanol", "test@123");

    //Home Page
    const homePage = new HomePage(page);
    await page.waitForTimeout(3000);
    await homePage.addProductToCart("Samsung galaxy s6 ");
    await page.waitForTimeout(3000);
    await homePage.gotoCart();

    //Cart Page
    const cartPage = new CartPage(page);
    const isProductInCart = await cartPage.checkProductsInCart("Samsung galaxy s6 ");
    expect(isProductInCart).toBeTruthy();
    expect(isProductInCart).toBeDefined();
})