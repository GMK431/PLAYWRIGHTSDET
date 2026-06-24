import { Page, Locator } from '@playwright/test';

export class LoginPage {

    //Define variables
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.loginLink = this.page.locator("a#login2");
        this.userNameInput = this.page.locator("input#loginusername");
        this.passwordInput = this.page.locator("input#loginpassword");
        this.loginButton = this.page.locator("button[onclick='logIn()']");
    }

    //Action Methods
    async clickLoginLink(): Promise<void> {
        await this.loginLink.click();
    }

    async fillUserNameInput(username: string): Promise<void> {
        await this.userNameInput.clear();
        await this.userNameInput.fill(username);
    }

    async fillPasswordInput(password: string): Promise<void> {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    //Calling all methods in one single method
    async performLogin(username: string, password: string) {

        await this.clickLoginLink();
        await this.fillUserNameInput(username);
        await this.fillPasswordInput(password);
        await this.clickLoginButton();
    }
}

