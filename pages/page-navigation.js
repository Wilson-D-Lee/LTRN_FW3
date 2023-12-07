class Navigation {
    constructor(page) {
        this.page = page;
        this.adminDropdown = page.locator('li', { hasText: 'Hello Admin: Wilson!wilson+admin@lantern.aiUser administrationData collection ad' }).locator('[role="button"]');
        this.userAdminMenuItem = page.locator('li', { hasText: 'User administration' }).nth(1);
    }

    async navigateToUserAdministration() {
        await this.adminDropdown.click();
        await this.userAdminMenuItem.click();
    }
}

module.exports = { Navigation };
