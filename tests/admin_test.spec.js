const { test, expect} = require('@playwright/test');
const { LoginPage } = require('../POM/loginPage');
const { adminUser, sec2pword, loginUrl } = require('../fixtures/testData.js');
const { AdminPage } = require('../POM/adminPage');
const { AuthPage } = require('../POM/authPage.js');

require('dotenv').config();

let sharedPage; // Declare sharedPage
let adminPage;



test.describe.serial('👨‍💼 Tab: Users Administration', () => {

  test.beforeAll(async ({ browser }) => {
    // Login to admin
    const context = await browser.newContext();
    sharedPage = await context.newPage(); 
    await sharedPage.goto(loginUrl);

    const loginPage = new LoginPage(sharedPage);
    const authPage = new AuthPage(sharedPage);
    await loginPage.user_login(adminUser, sec2pword);

    // Authentication 
    await authPage.generateAndEnterTOTP('admin');


    // Navigate to Users Administration
    await sharedPage.locator('li').filter({ hasText: 'Hello Admin: Wilson!wilson+admin@lantern.aiUser administrationData collection ad' }).getByRole('button').click();
    await sharedPage.locator('li').filter({ hasText: 'User administration' }).nth(1).click();
    await sharedPage.getByText('User administration').nth(3).click();
  });

  test.afterEach(async () => {
    await sharedPage.reload();
  });

  test('T1 - [Invite] admin user', async () => {
    const adminPage = new AdminPage(sharedPage);
    const randomEmail = await adminPage.generateRandomEmail();
    await adminPage.inviteAdminUser(randomEmail, 'Admin');
    await expect(sharedPage.getByText('Invitation sent!')).toBeVisible(4000);
  });


  test('T2 - [Invite] basic user', async () => {
    const adminPage = new AdminPage(sharedPage);
    const randomEmail = await adminPage.generateRandomEmail();
    await adminPage.inviteBasicUser(randomEmail, 'Basic'); 
    await expect(sharedPage.getByText('Invitation sent!')).toBeVisible(4000);
  });

  test('T3 - [Resend] Invite', async () => {
    const adminPage = new AdminPage(sharedPage);
    const emailToUpdate = 'Wilson+auto-T'; // Replace with the actual email pattern
    await adminPage.resendInvte(emailToUpdate);
    await expect(sharedPage.getByText('Invitation sent!')).toBeVisible(4000);
  });

  test('T4 - [Update] User', async () => {
    const adminPage = new AdminPage(sharedPage);
    const emailToUpdate = 'Wilson'; // Replace with the actual email pattern
    await adminPage.updateUser(emailToUpdate, 'Automated', 'Update', 'SDET');
    await expect(sharedPage.locator('.ResultScreen_message__YopzE')).toHaveText('Automated Update');
  });

  test('T5 - [Delete] User', async () => {
    const adminPage = new AdminPage(sharedPage);
    const emailToUpdate = 'Wilson+auto-T'; // Replace with the actual email pattern
    await adminPage.deleteUser(emailToUpdate);
    await expect(sharedPage.getByText('Removed')).toBeVisible(8000);
  });

});



