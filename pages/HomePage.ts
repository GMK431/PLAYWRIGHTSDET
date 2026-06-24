import { Page, Locator } from '@playwright/test'

export class HomePage {

    private readonly page: Page;
    private readonly productList: Promise<Locator[]>;
    private readonly addToCart: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productList = this.page.locator('div#tbodyid div.card h4.card-title a').all();

        this.addToCart = this.page.getByText('Add to cart');

        this.cartLink = this.page.locator("a#cartur");
    }

    //Method to add specific product to cart
    async addProductToCart(productName: string): Promise<void> {

        const productElements = this.productList;

        for (const product of await productElements) {
            const name = await product.textContent();

            if (name?.trim() == productName) {
                await product.click();
                break;
            }
        }

        //Handle alert/dialog
        this.page.once('dialog', async (dialog) => {
            if (dialog.message().includes('added')) {
                await dialog.accept();
            }
        });
        this.addToCart.click();
    }


    //Method to click on Cart
    async gotoCart() {
        await this.cartLink.click();
    }
}