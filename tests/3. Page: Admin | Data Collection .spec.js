const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { AuthPage } = require('../pages/auth-page.js');
const { basicUser, adminUser, companyUser, sec1pwd, sec2pwd } = require('../Users/users.js');
require('dotenv').config();


test.describe('@Story: Template Configuration | Company Admin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const loginPage = new LoginPage(page);
    const authPage = new AuthPage(page);
    await loginPage.user_login(adminUser, sec1pwd);
    await authPage.generateAndEnterTOTP('admin'); 
  });

  test('@Test:C203 | Add New Template - (Blanc)', async ({ page }) => {
    await page.pause();


  });

  test('@Test:C203 | Add New Template - (From Lantern Template)', async ({ page }) => {
    // await page.pause();


  });

  test('@Test:C203 | Add New Template - (Cancel Button)', async ({ page }) => {
    // await page.pause();


  });

});

test.describe('@Story: Workflow Configuration | Company Admin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const loginPage = new LoginPage(page);
    const authPage = new AuthPage(page);
    await loginPage.user_login(adminUser, sec1pwd);
    await authPage.generateAndEnterTOTP('admin'); 
  });


  test('@Test:C203 | Example1', async ({ page }) => {
    // await page.pause();


  });

  test('@Test:C203 | Example2', async ({ page }) => {
    // await page.pause();


  });

  test('@Test:C203 | Example 3', async ({ page }) => {
    // await page.pause();


  });

});

test.describe('@Story: Portfolio Company Users | Company Admin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const loginPage = new LoginPage(page);
    const authPage = new AuthPage(page);
    await loginPage.user_login(adminUser, sec1pwd);
    await authPage.generateAndEnterTOTP('admin'); 
  });


  test('@Test:C203 | Edit User', async ({ page }) => {
    // await page.pause();


  });

  test('@Test:C203 | Remove User', async ({ page }) => {
    // await page.pause();


  });

});


