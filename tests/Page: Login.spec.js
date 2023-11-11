const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page.js');
const { AuthPage } = require('../pages/auth-page.js'); // Assuming users.js contains user credentials
const { basicUser, adminUser, companyUser, pword } = require('../Users/users.js'); // Assuming users.js contains user credentials
require('dotenv').config();

test.describe('@Story: Login Functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('@Test:C204 | Empty Email Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login('', pword);
  });

  test('@Test:C205 | Empty Password Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login(basicUser, '');
  });

  test('@Test:C197 | Inval@Test Email Error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login('inval@Test_email@lantern.ai', pword);
    await page.waitForSelector('text=We can\'t seem to find your account.');
  });

  test('@Test:C199 | Inval@Test Password Error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login(basicUser, 'inval@Test_password');
    await page.waitForSelector('text=Your password is incorrect.');
  });

  test('@Test:C198 | Non lantern Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login('wilson@gmail.com', pword);
    await page.waitForSelector('text=We can\'t seem to find your account.');
  });

  test('@Test:C200 | Successful Login Redirect', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login(basicUser, pword);
    await page.waitForSelector('text=Enter the verification code from your authenticator app.');
  });
});



test.describe('@Story: Authentication Functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login(basicUser, pword);
    await page.waitForSelector('text=Enter the verification code from your authenticator app.');
  });

  test('@Test:C206 | Empty Authentication Code Field', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.enterAuthCode(''); // Passing empty code
    await expect(page.locator('text=A required field is missing. Please fill out all required fields and try again.')).toBeVisible();
  });

  test('@Test:C201 | Incorrect Authentication Code', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.enterAuthCode('123456'); // Passing incorrect code
    await expect(page.locator('text=Wrong code entered, please try again.')).toBeVisible();
  });

  test('@Test:C202 | Expired Authentication Code', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.enterAuthCode('123456'); // Assuming '123456' is an expired code
    // Add any additional assertions or operations if needed
  });

  test('@Test:C203 | Successful Authentication', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.enterAuthCode(process.env.USER_AUTHCODE); // Using auth code from environment variable
    await expect(page.locator('text=Active funds')).toBeVisible({ timeout: 60000 });
  });

});