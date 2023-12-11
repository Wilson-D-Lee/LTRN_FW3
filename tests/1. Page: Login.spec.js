const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { AuthPage } = require('../pages/auth-page.js');
const { basicUser, adminUser, companyUser, sec2pword } = require('../Users/users.js');
require('dotenv').config();

let sharedPage;

test.describe.serial('@Login', () => {

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto('/');
  });

  test.afterEach(async () => {
    await sharedPage.reload();
  });

  test('T1 - Empty Email Field', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login('', sec2pword);
    // Add assertions as necessary
  });

  test('T2 - Empty Password Field', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login(basicUser, '');
  });

  test('T3 - Inval@Test Email Error', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login('inval@Test_email@lantern.ai', sec2pword);
    await sharedPage.waitForSelector('text=We can\'t seem to find your account.');
  });

  test('T4 - Inval@Test Password Error', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login(basicUser, 'inval@Test_password');
    await sharedPage.waitForSelector('text=Your password is incorrect.');
  });

  test('T5 - Non lantern Email', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login('wilson@gmail.com', sec2pword);
    await sharedPage.waitForSelector('text=We can\'t seem to find your account.');
  });

  test('T6 - Successful Login Redirect', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login(basicUser, sec2pword);
    await sharedPage.waitForSelector('text=Enter the verification code from your authenticator app.');
  });
});

test.describe('Authentication', () => {

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto('/');
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login(basicUser, sec2pword);
    await sharedPage.waitForSelector('text=Enter the verification code from your authenticator app.');
  });

  test('T7 - Successful Authentication', async () => {
    const authPage = new AuthPage(sharedPage);
    await authPage.generateAndEnterTOTP('basic'); // Use 'admin' for admin user
    await expect(sharedPage.locator('text=Active funds')).toBeVisible({ timeout: 60000 });
  });
});
