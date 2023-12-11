const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { AuthPage } = require('../pages/auth-page.js');
const { AdminPage } = require('../pages/admin-page');
const { adminUser, sec2pword } = require('../Users/users.js');

require('dotenv').config();

let sharedPage; // Declare sharedPage
let adminPage;

test.describe.serial('Tab: Users Administration', () => {
  test.beforeAll(async ({ browser }) => {
    // Login to admin
    const context = await browser.newContext();
    sharedPage = await context.newPage(); // Use sharedPage
    await sharedPage.goto('/');

    const loginPage = new LoginPage(sharedPage);
    const authPage = new AuthPage(sharedPage);
    await loginPage.user_login(adminUser, sec2pword);

    // Authentication 
    await authPage.generateAndEnterTOTP('admin');
    await expect(sharedPage.locator('text=Active funds')).toBeVisible({ timeout: 60000 });

    // Navigate to Users Administration
    await sharedPage.locator('li').filter({ hasText: 'Hello Admin: Wilson!wilson+admin@lantern.aiUser administrationData collection ad' }).getByRole('button').click();
    await sharedPage.locator('li').filter({ hasText: 'User administration' }).nth(1).click();
    await sharedPage.getByText('User administration').nth(3).click();
  });

  test.afterEach(async () => {
    await sharedPage.reload();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  test('T1 - Invite admin user', async () => {
    const adminPage = new AdminPage(sharedPage);
    const randomEmail = await adminPage.generateRandomEmail();
    await adminPage.inviteAdminUser(randomEmail, 'Admin');
    await expect(adminPage.resultMessage).toHaveText('Invitation sent!');
  });

  test('T2 - Invite basic user', async () => {
    const adminPage = new AdminPage(sharedPage);
    const randomEmail = await adminPage.generateRandomEmail();
    await adminPage.inviteBasicUser(randomEmail, 'Basic'); // Assuming 'Basic' is the correct role name
    await expect(adminPage.resultMessage).toHaveText('Invitation sent!');
  });

  test('T3 - Update new user', async () => {
    const adminPage = new AdminPage(sharedPage);
    const emailToUpdate = 'Wilson+auto-T'; // Replace with the actual email pattern
    await adminPage.updateUser(emailToUpdate, 'Automated', 'Update', 'SDET');
    // await expect(sharedPage.locator('.ResultScreen_message__YopzE')).toHaveText('Automated Update');

  });


});

test.describe.serial('Tab: Template Configuration', () => {
  let adminPage;

  test.beforeAll(async ({ browser }) => {
    // Login to admin
    const context = await browser.newContext();
    sharedPage = await context.newPage(); // Use sharedPage
    adminPage = new AdminPage(sharedPage);
    await sharedPage.goto('/');

    const loginPage = new LoginPage(sharedPage);
    const authPage = new AuthPage(sharedPage);
    await loginPage.user_login(adminUser, sec2pword);

    // Authentication
    await authPage.generateAndEnterTOTP('admin');
    await expect(sharedPage.locator('text=Active funds')).toBeVisible({ timeout: 100000 });

    // Navigate to Data Administration
    await sharedPage.locator('li').filter({ hasText: 'Hello Admin: Wilson!wilson+admin@lantern.aiUser administrationData collection ad' }).getByRole('button').click();
    await sharedPage.locator('li').filter({ hasText: 'Data collection administration' }).nth(1).click();
    // await expect(sharedPage.locator('Template configuration')).toBeVisible({ timeout: 100000 });

  });

  test.afterEach(async () => {
    await sharedPage.locator('li').filter({ hasText: 'Hello Admin: Wilson!wilson+admin@lantern.aiUser administrationData collection ad' }).getByRole('button').click();
    await sharedPage.locator('li').filter({ hasText: 'Data collection administration' }).nth(1).click();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  //Template Configuration High Level Functionality 


  test('T1 - [ Add, Update, Delete ] (Lantern) Template', async () => {
    //Add New Template 
    const TemplateName = adminPage.generateTemplateName();
    await adminPage.addNewLanternTemplate(TemplateName);
    const newTemplateLocator = sharedPage.locator(`text=${TemplateName}`);
    await expect(newTemplateLocator).toBeVisible();


    //Update Template name
    await sharedPage.locator('div.Icon_wrapper__9gdnh.IconButton_icon__C2Nzx').nth(1).click();
    await sharedPage.getByPlaceholder('E.g. \'B2B\'').click();
    await sharedPage.getByPlaceholder('E.g. \'B2B\'').press('Meta+a');
    await sharedPage.getByPlaceholder('E.g. \'B2B\'').fill('Edited Template: '+TemplateName);
    await sharedPage.getByPlaceholder('E.g. \'B2B\'').click();
    await sharedPage.getByRole('button', { name: 'Save' }).click();
    await expect(sharedPage.locator('text=Edited Template')).toBeVisible();


    //Delete template
    await sharedPage.locator('.ClientAdminTemplateConfigDetails_templateSectionHeader__1i2uU > button:nth-child(3)').click();
    await sharedPage.getByRole('button', { name: 'Delete' }).click();
    await sharedPage.getByRole('button', { name: 'Delete template' }).click();

  });

  test('T2 - [ Cancel ] (Lantern) Template', async () => {
    //Add New Template 
    await sharedPage.locator('div').filter({ hasText: /^ActualsReporting groupAdd new templateBlank templateFrom Lantern template$/ }).getByTestId('btn').click();
    await sharedPage.getByRole('button', { name: 'Lantern template' }).click();
    await sharedPage.getByRole('button', { name: 'Cancel' }).click();

    //Cancel button  
    await sharedPage.locator('div').filter({ hasText: /^ActualsReporting groupAdd new templateBlank templateFrom Lantern template$/ }).getByTestId('btn').click();
    await sharedPage.getByRole('button', { name: 'From Lantern template' }).click();
    await sharedPage.getByRole('button', { name: 'Cancel' }).click();
  });

  test('T3 - [ Add, Update, Delete ] (Blank) Template', async () => {
    //Add New Template 
    const TemplateName = adminPage.generateTemplateName();
    await adminPage.addNewBlankTemplate(TemplateName);
    const newTemplateLocator = sharedPage.locator(`text=${TemplateName}`);
    await expect(newTemplateLocator).toBeVisible();

    //Update Template name
    await sharedPage.locator('div.Icon_wrapper__9gdnh.IconButton_icon__C2Nzx').nth(1).click();
    await sharedPage.getByPlaceholder('E.g. \'B2B\'').click();
    await sharedPage.getByPlaceholder('E.g. \'B2B\'').press('Meta+a');
    await sharedPage.getByPlaceholder('E.g. \'B2B\'').fill('Edited Template: '+TemplateName);
    await sharedPage.getByPlaceholder('E.g. \'B2B\'').click();
    await sharedPage.getByRole('button', { name: 'Save' }).click();
    await expect(sharedPage.locator('text=Edited Template')).toBeVisible();

    //Delete template
    await sharedPage.locator('.ClientAdminTemplateConfigDetails_templateSectionHeader__1i2uU > button:nth-child(3)').click();
    await sharedPage.getByRole('button', { name: 'Delete' }).click();
    await sharedPage.getByRole('button', { name: 'Delete template' }).click();
  });

  test('T4 - [ Cancel ] (Blank) Template', async () => {
    //Add New Template 
    await sharedPage.locator('div').filter({ hasText: /^ActualsReporting groupAdd new templateBlank templateFrom Lantern template$/ }).getByTestId('btn').click();
    await sharedPage.getByRole('button', { name: 'Blank template' }).click();
    await sharedPage.getByRole('button', { name: 'Cancel' }).click();

    //Cancel button  
    await sharedPage.locator('div').filter({ hasText: /^ActualsReporting groupAdd new templateBlank templateFrom Lantern template$/ }).getByTestId('btn').click();
    await sharedPage.getByRole('button', { name: 'From Lantern template' }).click();
    await sharedPage.getByRole('button', { name: 'Cancel' }).click();
  });


  test('T5 - [ Add, Update, Delete ] (Lantern) Group', async () => {
    //Add New Template 
    const TemplateName = adminPage.generateTemplateName();
    await adminPage.addNewBlankTemplate(TemplateName);
    const newTemplateLocator = sharedPage.locator(`text=${TemplateName}`);
    await expect(newTemplateLocator).toBeVisible();
    

    // P&L
    await sharedPage.getByTestId('btn').click();
    await sharedPage.getByRole('button', { name: 'Custom group' }).click();
    await sharedPage.getByRole('button', { name: 'P&L' }).click();
    await sharedPage.getByRole('button', { name: 'Add new group' }).nth(1).click();
    await sharedPage.reload();
    
    // Cash Flow
    await sharedPage.getByRole('button', { name: 'Add new group' }).click();
    await sharedPage.getByRole('button', { name: 'Custom group' }).click();
    await sharedPage.getByRole('button', { name: 'Cash flow' }).click();
    await sharedPage.getByRole('button', { name: 'Add new group' }).nth(1).click();
    await sharedPage.reload();

    // Balence Sheet
    await sharedPage.getByRole('button', { name: 'Add new group' }).click();
    await sharedPage.getByRole('button', { name: 'Custom group' }).click();
    await sharedPage.getByRole('button', { name: 'Balance sheet' }).click();
    await sharedPage.getByRole('button', { name: 'Add new group' }).nth(1).click();
    await sharedPage.reload();

    // M&A 
    await sharedPage.getByRole('button', { name: 'Add new group' }).click();
    await sharedPage.getByRole('button', { name: 'Custom group' }).click();
    await sharedPage.getByRole('button', { name: 'M&A activity' }).click();
    await sharedPage.getByRole('button', { name: 'Add new group' }).nth(1).click();
    await sharedPage.reload();

    // Employee
    await sharedPage.getByRole('button', { name: 'Add new group' }).click();
    await sharedPage.getByRole('button', { name: 'Custom group' }).click();
    await sharedPage.getByRole('button', { name: 'Employee' }).click();
    await sharedPage.getByRole('button', { name: 'Add new group' }).nth(1).click();
    await sharedPage.reload();

    // Other
    await sharedPage.getByRole('button', { name: 'Add new group' }).click();
    await sharedPage.getByRole('button', { name: 'Custom group' }).click();
    await sharedPage.getByRole('button', { name: 'Other' }).click();
    await sharedPage.getByRole('button', { name: 'Add new group' }).nth(1).click();
    await sharedPage.reload();
    
    // Validate that [P&L, Cash flow, Balance sheet, M&A activity, Employee, Other] 
    const sectionLocator = sharedPage.locator('.ClientAdminTemplateConfigDetails_section__HMHHD');  
    await expect(sectionLocator.locator('text=P&L')).toBeVisible();
    await expect(sectionLocator.locator('text=Cash flow')).toBeVisible();
    await expect(sectionLocator.locator('text=Balance sheet')).toBeVisible();
    await expect(sectionLocator.locator('text=M&A activity')).toBeVisible();
    await expect(sectionLocator.locator('text=Employee')).toBeVisible();
    await expect(sectionLocator.locator('text=Other')).toBeVisible();


    // Delete Group
    await sharedPage.locator('div').filter({ hasText: /^P&Lgroup$/ }).getByRole('img').click();
    await sharedPage.locator('div').filter({ hasText: /^P&Lgroup$/ }).getByRole('button').click();
    await sharedPage.getByRole('button', { name: 'Delete' }).click();

    // Assert that its been deleted
    await expect(sectionLocator.locator('text=P&L')).toBeHidden();
    
  });

  test('T6 - [ Cancel ] (Lantern) Group', async () => {
    //Add New Template 
    const TemplateName = adminPage.generateTemplateName();
    await adminPage.addNewBlankTemplate(TemplateName);
    const newTemplateLocator = sharedPage.locator(`text=${TemplateName}`);
    await expect(newTemplateLocator).toBeVisible();
    

    // Add Group P&L
    await sharedPage.getByTestId('btn').click();
    await sharedPage.getByRole('button', { name: 'Custom group' }).click();
    await sharedPage.getByRole('button', { name: 'P&L' }).click();

    //Cancel button  
    await sharedPage.getByRole('button', { name: 'Cancel' }).click();
    

  });

  //Template Configuration -> Group Functionality 

  test('T7 - [ Add, Update Delete ] (Custom) Group', async () => {
    //Add New Template 
    const TemplateName = adminPage.generateTemplateName();
    await adminPage.addNewLanternTemplate(TemplateName);
    const newTemplateLocator = sharedPage.locator(`text=${TemplateName}`);
    await expect(newTemplateLocator).toBeVisible();

    //Add Custom Group
    await sharedPage.getByRole('button', { name: 'Add new group' }).click(); 
    await sharedPage.locator('input[name="name"]').click();
    await sharedPage.locator('input[name="name"]').fill('Custom Group');
    await sharedPage.getByRole('button', { name: 'Add new group' }).nth(1).click();

    //Assert Custom Group Exists 
    const elementLocator = sharedPage.locator('text=Custom GroupgroupLantern referenceReporting nameDescriptionUnit typeUnit labelMa');
    await expect(elementLocator).toBeVisible();


    //Update Custom Group 
    await sharedPage.locator('div').filter({ hasText: /^Custom Groupgroup$/ }).getByRole('img').click();
    await sharedPage.locator('div').filter({ hasText: /^Custom Groupgroup$/ }).getByRole('button').click();
    await sharedPage.locator('input[name="name"]').click();
    await sharedPage.locator('input[name="name"]').fill('Custom Group ');
    await sharedPage.locator('input[name="name"]').fill('Custom Group Updated');
    await sharedPage.getByRole('button', { name: 'Save' }).click();

    //Assertion of the group name being updated 
    const customGroupUpdatedLocator = sharedPage.locator('text=Custom Group Updated');
    await expect(customGroupUpdatedLocator).toBeVisible();


    //Delete Custom Group
    // await sharedPage.pause(); 
    await sharedPage.locator('div').filter({ hasText: /^Custom Group Updatedgroup$/ }).getByRole('button').click();
    await sharedPage.getByRole('button', { name: 'Delete' }).click();

    // Assert that its no longer visible
    const sectionLocator = sharedPage.locator('.ClientAdminTemplateConfigDetails_section__HMHHD');  
    await expect(sectionLocator.locator('text=Custom Group Updated')).toBeHidden();

  });


  test('T8 - [ Cancel ] (Custom) Group', async () => {
    //Add New Template 
    const TemplateName = adminPage.generateTemplateName();
    await adminPage.addNewLanternTemplate(TemplateName);
    const newTemplateLocator = sharedPage.locator(`text=${TemplateName}`);
    await expect(newTemplateLocator).toBeVisible();
    

    // Add Group P&L
    await sharedPage.getByRole('button', { name: 'Add new group' }).click(); 
    await sharedPage.locator('input[name="name"]').click();
    await sharedPage.locator('input[name="name"]').fill('Custom Group');


    //Cancel button  
    await sharedPage.getByRole('button', { name: 'Cancel' }).click();
    //Assertion
    

  });


  //Template Configuration Group -> Metric Functionality 
  test('T14 - [ Add, Update, Delete ] Metric', async () => {

    await sharedPage.pause()

  });
  
  test('T15 - [ Cancel ] Metric', async () => {

    await sharedPage.pause()

  });


}); 

test.describe.serial('Tab: Workflow Configuration', () => {
  test.beforeAll(async ({ browser }) => {
    // Login to admin
    const context = await browser.newContext();
    sharedPage = await context.newPage(); // Use sharedPage
    adminPage = new AdminPage(sharedPage);
    await sharedPage.goto('/');

    const loginPage = new LoginPage(sharedPage);
    const authPage = new AuthPage(sharedPage);
    await loginPage.user_login(adminUser, sec2pword);

    // Authentication
    await authPage.generateAndEnterTOTP('admin');
    await expect(sharedPage.locator('text=Active funds')).toBeVisible({ timeout: 100000 });

    // Navigate to Data Administration -> workflow tab
    await sharedPage.locator('li').filter({ hasText: 'Hello Admin: Wilson!wilson+admin@lantern.aiUser administrationData collection ad' }).getByRole('button').click();
    await sharedPage.locator('li').filter({ hasText: 'Data collection administration' }).nth(1).click();
    await sharedPage.getByRole('link', { name: 'Workflow configuration' }).click();

  });

  test.afterEach(async () => {
    await sharedPage.reload();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  test('Add Workflow (Cancel btn)', async () => {
    await sharedPage.pause()
  });

  test('Add a new Workflow', async () => {
    await sharedPage.pause()
  });




// test.describe('@Story: Tab - Portfolio Company Users', () => {

//   test.beforeAll(async ({ browser }) => {
//     const page = await browser.newPage();
//     await sharedPage.goto('/');
//     const loginPage = new LoginPage(page);
//     const authPage = new AuthPage(page);
//     await loginPage.user_login(adminUser, sec2pword);
//     await authPage.generateAndEnterTOTP('admin'); 
//     await sharedPage.close();
//   });


//   test('Edit User', async ({ page }) => {
//     // await sharedPage.pause();

//   });

//   test('Remove User', async ({ page }) => {
//     // await sharedPage.pause();

//   });

});

