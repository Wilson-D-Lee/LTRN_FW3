const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { AuthPage } = require('../pages/auth-page.js'); 
const { basicUser, adminUser, companyUser, sec2pword } = require('../Users/users.js'); 
require('dotenv').config();

test.describe('@Story: Tab - Users Administration', () => {

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('/');
    const loginPage = new LoginPage(page);
    const authPage = new AuthPage(page);
    await loginPage.user_login(adminUser, sec2pword);
    await authPage.generateAndEnterTOTP('admin'); 
    await page.close();
  });

  test('@Test:C203 | Inviting a new User', async ({ page }) => {
    // await page.pause();
      
    
  });

  test('@Test:C203 | Update/ Edit the new User', async ({ page }) => {
    // await page.pause();
      
    
  });

  test('@Test:C203 | Deleting the new User', async ({ page }) => {
    // await page.pause();
      
    
  });
  
});

test.describe('@Story: Tab - Template Configuration', () => {

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('/');
    const loginPage = new LoginPage(page);
    const authPage = new AuthPage(page);
    await loginPage.user_login(adminUser, sec2pword);
    await authPage.generateAndEnterTOTP('admin'); 
    await page.close();
  });

  test('@Test:C203 | Add New (Blanc) Template ', async ({ page }) => {
    // await page.pause();


  });

  test('@Test:C203 | Add New (From Lantern Template) Template', async ({ page }) => {
    // await page.pause();


  });

  test('@Test:C203 | Add New Template (Cancel Button)', async ({ page }) => {
    // await page.pause();


  });

});

test.describe('@Story: Tab - Workflow Configuration', () => {

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('/');
    const loginPage = new LoginPage(page);
    const authPage = new AuthPage(page);
    await loginPage.user_login(adminUser, sec2pword);
    await authPage.generateAndEnterTOTP('admin'); 
    await page.close();
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

test.describe('@Story: Tab - Portfolio Company Users', () => {

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('/');
    const loginPage = new LoginPage(page);
    const authPage = new AuthPage(page);
    await loginPage.user_login(adminUser, sec2pword);
    await authPage.generateAndEnterTOTP('admin'); 
    await page.close();
  });


  test('@Test:C203 | Edit User', async ({ page }) => {
    // await page.pause();

  });

  test('@Test:C203 | Remove User', async ({ page }) => {
    // await page.pause();

  });

});
