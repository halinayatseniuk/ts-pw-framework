import { Page } from "@playwright/test";
import { expect } from '@playwright/test';
import { ContactUsPage } from './ContactUsPage';
import { DropdownsPage } from './DropdownsPage';
import { AutocompletePage } from './AutocompletePage';

export class MyCoursesPage {

    constructor(private page: Page) {}

    public get contactUsOption() {
        return this.page.locator("#contact-us");
    }

    public get dropdownsOption() {
        return this.page.locator("#dropdown-checkboxes-radiobuttons");
    }

    public get autocompleteOption() {
        return this.page.locator("#autocomplete-textfield");
    }

    public autocompletePageTitle(page: Page) {
        return page.locator("h2:has-text('Autocomplete TextField')");
    }

    public async openContactUsPage() {
        const newPagePromise = this.page.context().waitForEvent('page');
        await this.contactUsOption.click();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState();
        await expect(newPage).toHaveTitle('WebDriver | Contact Us');
        return new ContactUsPage(newPage);
    }

    public async openDropdownsPage() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.dropdownsOption.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveTitle('WebDriver | Dropdown Menu(s) | Checkboxe(s) | Radio Button(s)');
        return new DropdownsPage(newPage);
    }

    public async openAutocompletePage() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.autocompleteOption.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage.locator("h2:has-text('Autocomplete TextField')")).toBeVisible();
        return new AutocompletePage(newPage);
    }

    public async openMyCoursesPage() {
        await this.page.goto('https://webdriveruniversity.com/');
        return await expect(this.page).toHaveTitle('WebDriverUniversity.com');
    }
}