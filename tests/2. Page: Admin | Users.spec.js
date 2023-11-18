const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { AuthPage } = require('../pages/auth-page.js'); 
const { basicUser, adminUser, companyUser, sec1pwd, sec2pwd } = require('../Users/users.js'); 
require('dotenv').config();

test.describe('@Story: User Administration', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const loginPage = new LoginPage(page);
    const authPage = new AuthPage(page);
    await loginPage.user_login(adminUser, sec1pwd);
    await authPage.generateAndEnterTOTP('admin'); 

  });


  test('@Test:C203 | Inviting a new User', async ({ page }) => {
    // await page.pause();
      
    
  });

  test('@Test:C203 | Editing the new User', async ({ page }) => {
    // await page.pause();
      
    
  });

  test('@Test:C203 | Deleting the new User', async ({ page }) => {
    // await page.pause();
      
    
  });

});