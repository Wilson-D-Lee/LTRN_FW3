const { test, expect} = require('@playwright/test');
const { LoginPage } = require('../POM/loginPage');
const { basicUser, sec2pword, loginUrl } = require('../../../../../PlaywrightProject/fixtures/testData.js/index.js');

require('dotenv').config();


let sharedPage;

test.describe.serial('Login Functionality', () => {

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto(loginUrl);
  });

  test.afterEach(async () => {
    await sharedPage.reload();
  });

  test('T1 - Empty Email Field', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login('', process.env.USER_PASSWORD);
    // Add assertions as necessary
  });

  test('T2 - Empty Password Field', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login(basicUser, '');
  });

  test('T3 - Inval Email [Error]', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login('inval@Test_email@lantern.ai', process.env.USER_PASSWORD);
    await sharedPage.waitForSelector('text=We can\'t seem to find your account.');
  });

  test('T4 - Inval Password [Error]', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login(basicUser, 'inval@Test_password');
    await sharedPage.waitForSelector('text=Your password is incorrect.');
  });

  test('T5 - Non lantern Email', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login('wilson@gmail.com', process.env.USER_PASSWORD);
    await sharedPage.waitForSelector('text=We can\'t seem to find your account.');
  });

  test('T6 - Successful Login Redirect', async () => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.user_login(basicUser, process.env.USER_PASSWORD);
    await sharedPage.waitForSelector('text=Enter the verification code from your authenticator app.');
  });
});