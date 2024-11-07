import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.submitButton = page.locator('[data-testid="loginPopup"] button[type="submit"]');
    }
}
