import { Page, Locator } from '@playwright/test'

export class CartPage {
    private readonly page: Page;
    private productNamesInCartSelector: Promise<Array<Locator>>;

    constructor(page: Page) {

        this.page = page;
        this.productNamesInCartSelector = this.page.locator("tbody#tbodyid tr td:nth-child(2)").all();

    }

    async checkProductsInCart(productName: string) {
        const products = await this.productNamesInCartSelector;

        for (const product of products) {
            const name = (await product.textContent())?.trim();
            console.log(name);
            if (name == productName) {
                return true;
            } return false;
        }
    }
}