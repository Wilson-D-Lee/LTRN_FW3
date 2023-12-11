exports.AdminPage = class AdminPage {
    constructor(page) {
        this.page = page;
        this.inviteEmailInput = page.getByPlaceholder('Enter user\'s email');
        this.resultMessage = page.locator('.ResultScreen_message__YopzE'); // Add this line
    }


    async inviteAdminUser(email, role) {
        await this.page.getByTestId('btn').click();
        await this.inviteEmailInput.click();
        await this.inviteEmailInput.fill(email);
        await this.page.getByRole('button', { name: 'User', exact: true }).click();
        await this.page.getByRole('button', { name: role }).click();
        await this.page.getByRole('button', { name: 'Invite', exact: true }).click();
    }

    async inviteBasicUser(email) {
        await this.page.getByTestId('btn').click();
        await this.inviteEmailInput.click();
        await this.inviteEmailInput.fill(email);
        await this.page.getByRole('button', { name: 'Invite', exact: true }).click();
    }

    async updateUser(email, firstName, lastName, jobTitle) {
        await this.page.locator(`text=${email}`).first().click();

        // Update First Name
        const firstNameInput = this.page.locator('input[name="firstName"]');
        await firstNameInput.click({ clickCount: 3 });
        await firstNameInput.fill(firstName);

        // Update Last Name
        const lastNameInput = this.page.locator('input[name="lastName"]');
        await lastNameInput.click({ clickCount: 3 });
        await lastNameInput.fill(lastName);

        // Update Job Title
        const jobTitleInput = this.page.locator('input[name="job"]');
        await jobTitleInput.click({ clickCount: 3 });
        await jobTitleInput.fill(jobTitle);

        // Role Switching (if applicable)

        // for (const role of roles) {
        //     await this.page.getByRole('button', { name: role }).click();
        // }

        await this.page.getByRole('button', { name: 'Submit' }).click();

        await this.page.reload();
    }

    async addNewBlankTemplate(templateName) {
        await this.page.locator('div').filter({ hasText: /^ActualsReporting groupAdd new templateBlank templateFrom Lantern template$/ }).getByTestId('btn').click();
        await this.page.getByRole('button', { name: 'Blank template' }).click();
        await this.page.getByPlaceholder('E.g. \'B2B\'').fill(templateName);
        await this.page.getByRole('button', { name: 'Add template' }).click();
      }

    async addNewLanternTemplate(templateName) {
        await this.page.locator('div').filter({ hasText: /^ActualsReporting groupAdd new templateBlank templateFrom Lantern template$/ }).getByTestId('btn').click();
        await this.page.getByRole('button', { name: 'From Lantern template' }).click();
        await this.page.getByPlaceholder('E.g. \'B2B\'').fill(templateName);
        await this.page.getByRole('button', { name: 'Add template' }).click();
    }
      
   

    generateTemplateName() {
        const randomNumber = Math.floor(Math.random() * 100000); 
        return `AutoTest${randomNumber}`;
      }


    async generateRandomEmail() {
        const randomNumber = Math.floor(Math.random() * 28888) + 1;
        return `Wilson+auto-T${randomNumber}@lantern.ai`;
    }

    // Include other necessary functions related to the Admin page
}
