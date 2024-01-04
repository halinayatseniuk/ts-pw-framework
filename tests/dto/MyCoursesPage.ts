import { Page } from "@playwright/test";
import { expect } from '@playwright/test';
import { ContactUsPage } from './ContactUsPage';

export class MyCoursesPage {

    constructor(private page: Page) {}

    public get contactUsOption() {
        return this.page.locator("#contact-us");
    }

    public async openContactUsPage() {
        const newPagePromise = this.page.context().waitForEvent('page')
        await this.contactUsOption.click();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState();
        await expect(newPage).toHaveTitle('WebDriver | Contact Us');
        return new ContactUsPage(newPage);
    }

    public async openMyCoursesPage() {
        await this.page.goto('https://webdriveruniversity.com/');
        return await expect(this.page).toHaveTitle('WebDriverUniversity.com');
    }
}