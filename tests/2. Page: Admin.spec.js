const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { AuthPage } = require('../pages/auth-page.js');
const { adminUser, sec2pword } = require('../Users/users.js');
require('dotenv').config();

let sharedPage; // Declare sharedPage

test.describe.serial('Tab - Users Administration', () => {


  test.beforeAll(async ({ browser }) => {
    // Login to admin
    const context = await browser.newContext();
    sharedPage = await context.newPage(); // Use sharedPage
    await sharedPage.goto('/');

    const loginPage = new LoginPage(sharedPage);
    const authPage = new AuthPage(sharedPage);
    await loginPage.user_login(adminUser, sec2pword);


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

  test('Invite new user: [admin]', async () => {
    // This should be in the admin page.js 
    //invite an admin user: 
    await sharedPage.getByTestId('btn').click();
    await sharedPage.getByPlaceholder('Enter user\'s email').click();
    await sharedPage.getByPlaceholder('Enter user\'s email').fill(generateRandomEmail());
    await sharedPage.getByRole('button', { name: 'User', exact: true }).click();
    await sharedPage.getByRole('button', { name: 'Admin' }).click();
    await sharedPage.getByRole('button', { name: 'Invite', exact: true }).click();
    await expect(sharedPage.locator('.ResultScreen_message__YopzE')).toHaveText('Invitation sent!');

  });

  test('Invite new user: [basic]', async () => {
    // This should be in the admin page.js 
    // invite a basic user: 
    await sharedPage.getByTestId('btn').click();
    await sharedPage.getByPlaceholder('Enter user\'s email').click();
    await sharedPage.getByPlaceholder('Enter user\'s email').fill(generateRandomEmail());
    await sharedPage.getByRole('button', { name: 'Invite', exact: true }).click();
    await expect(sharedPage.locator('.ResultScreen_message__YopzE')).toHaveText('Invitation sent!');
  });

  test('Update new user', async () => {
  // This should be in the admin page.js 
    await sharedPage.locator('text=Wilson+auto-T').first().click();
    await sharedPage.locator('input[name="firstName"]').click();
    await sharedPage.locator('input[name="firstName"]').press('Meta+a');
    await sharedPage.locator('input[name="firstName"]').fill('Automated');
    await sharedPage.locator('input[name="lastName"]').click();
    await sharedPage.locator('input[name="lastName"]').press('Meta+a');
    await sharedPage.locator('input[name="lastName"]').fill('Update');
    await sharedPage.getByRole('button', { name: 'Admin' }).click();
    await sharedPage.getByRole('button', { name: 'User', exact: true }).click();
    await sharedPage.locator('input[name="job"]').click();
    await sharedPage.locator('input[name="job"]').fill('SDET');
    await sharedPage.getByRole('button', { name: 'Partner' }).click();
    await sharedPage.getByRole('button', { name: 'Finance Leader' }).click();
    await sharedPage.getByRole('button', { name: 'Submit' }).click();
    await sharedPage.reload();
    expect(sharedPage.locator('.ResultScreen_message__YopzE')).toHaveText('Automated Update');
  });

  test('Delete new user', async ({ page }) => {
    // await sharedPage.pause();
    await sharedPage.locator('text=Wilson+auto-T').first().click();
    // await sharedPage.pause();
    
  });

});

// This should be in the admin page.js 
function generateRandomEmail() {
  // Generate a random number between 1 and 9
  const randomNumber = Math.floor(Math.random() * 28888) + 1;

  // Construct the email using the random number
  return `Wilson+auto-T${randomNumber}@lantern.ai`;
}

// This should be in the admin page.js 
const randomEmail = generateRandomEmail();
console.log(randomEmail); // Example output: Wilson+auto-T5@lantern.ai



// test.describe.serial('@Story: Tab - Template Configuration', () => {

//   test.beforeAll(async ({ browser }) => {
//     const page = await browser.newPage();
//     await sharedPage.goto('/');
//     const loginPage = new LoginPage(page);
//     const authPage = new AuthPage(page);
//     await loginPage.user_login(adminUser, sec2pword);
//     await authPage.generateAndEnterTOTP('admin'); 
//     await sharedPage.close();
//   });

//   test('Add New (Blanc) Template ', async ({ page }) => {
//     // await sharedPage.pause();
//   });

//   test('Add New (From Lantern Template) Template', async ({ page }) => {
//     // await sharedPage.pause();
//   });

//   test('Add New Template (Cancel Button)', async ({ page }) => {
//     // await sharedPage.pause();
//   });

// });

// test.describe.serial('@Story: Tab - Workflow Configuration', () => {

//   test.beforeAll(async ({ browser }) => {
//     const page = await browser.newPage();
//     await sharedPage.goto('/');
//     const loginPage = new LoginPage(page);
//     const authPage = new AuthPage(page);
//     await loginPage.user_login(adminUser, sec2pword);
//     await authPage.generateAndEnterTOTP('admin'); 
//     await sharedPage.close();
//   });


//   test('Example1', async ({ page }) => {
//     // await sharedPage.pause();

//   });

//   test('Example2', async ({ page }) => {
//     // await sharedPage.pause();

//   });

//   test('Example 3', async ({ page }) => {
//     // await sharedPage.pause();

//   });

// });

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

// });


//random email genorator: 



