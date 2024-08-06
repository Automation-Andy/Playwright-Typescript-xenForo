import { Page } from "@playwright/test";

export class LogIn {
    private readonly dialog = this.page.locator(`.overlay-container`);
    readonly locators = {
        fields: {
            username: this.dialog.getByLabel('Your name or email address'),
            password: this.dialog.getByLabel('Password'),
        },
        checkboxes: {
            stayLoggedIn: this.dialog.locator('label').filter({ hasText: 'Stay logged in' }).locator('i'),
        },
        buttons: {
            logIn: this.dialog.getByRole('button', { name: 'Log in' }),
            register: this.dialog.getByRole('link', { name: 'Register now' }),
            closeX: this.dialog.getByRole('button', { name: 'Close' }),
        },
        links: {
            forgotPassword: this.dialog.getByRole('link', { name: 'Forgot your password?' }),
        },    
    }

    constructor(private readonly page: Page) {}

    async loginAs(username: string, password: string, stayLoggedIn = false): Promise<void> {
        await this.setUserNameOrEmail(username);
        await this.setPassword(password);   
        await this.checkStayLoggedIn(stayLoggedIn);
        await this.clickLogIn();
    }

    async setUserNameOrEmail(username: string): Promise<void> { 
        await this.locators.fields.username.fill(username);
    }

    async setPassword(password: string): Promise<void> {
        await this.locators.fields.password.fill(password);
    }

    async clickLogIn(): Promise<void> {
        await this.locators.buttons.logIn.click();
    }

    async clickRegister(): Promise<void> {
        await this.locators.buttons.register.click();
    }

    async checkStayLoggedIn(checked: boolean): Promise<void> {
        await this.locators.checkboxes.stayLoggedIn.setChecked(checked);
    }
}