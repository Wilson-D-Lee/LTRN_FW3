const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page.js');
const { AuthPage } = require('../pages/auth-page.js'); // Assuming users.js contains user credentials
const { basicUser, adminUser, companyUser, sec1pwd, sec2pwd } = require('../Users/users.js'); // Assuming users.js contains user credentials
require('dotenv').config();

test.describe('@Story: Login Functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('@Test:C204 | Empty Email Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login('', sec1pwd);
  });

  test('@Test:C205 | Empty Password Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login(basicUser, '');
  });

  test('@Test:C197 | Inval@Test Email Error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login('inval@Test_email@lantern.ai', sec1pwd);
    await page.waitForSelector('text=We can\'t seem to find your account.');
  });

  test('@Test:C199 | Inval@Test Password Error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login(basicUser, 'inval@Test_password');
    await page.waitForSelector('text=Your password is incorrect.');
  });

  test('@Test:C198 | Non lantern Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login('wilson@gmail.com', sec1pwd);
    await page.waitForSelector('text=We can\'t seem to find your account.');
  });

  test('@Test:C200 | Successful Login Redirect', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login(basicUser, sec1pwd);
    await page.waitForSelector('text=Enter the verification code from your authenticator app.');
  });
});



test.describe('@Story: Authentication Functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const loginPage = new LoginPage(page);
    await loginPage.basic_user_login(basicUser, sec1pwd);
    await page.waitForSelector('text=Enter the verification code from your authenticator app.');
  });


  // test('@Test:C203 | Successful Authentication', async ({ page }) => {
  //   const authPage = new AuthPage(page);
  //   await authPage.enterAuthCode(process.env.USER_AUTHCODE); // Using auth code from environment variable
  //   await expect(page.locator('text=Active funds')).toBeVisible({ timeout: 60000 });
  // });

});