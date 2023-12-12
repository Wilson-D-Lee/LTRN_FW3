const { defineConfig, devices } = require('@playwright/test');
const { testPlanFilter } = require("allure-playwright/dist/testplan");

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // workers: process.env.CI ? 1 : undefined,
  workers: 1,
  retries: 2, //Number of retries before fail
  grep: testPlanFilter(),

  // Reporter configuration
  reporter: [
    ['html', { open: 'on-failure' }],['list'],// 'always', 'never', or 'on-failure'. 
    ['line'], ['allure-playwright'],// Default reporter
  ],

  // Global test settings
  use: {
    baseURL: 'https://app.uat.app.lantern.ai/',
    headless: false,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    actionTimeout: 10000
    // Other global settings
  },


  /* Configure projects for major browsers */
  projects: [

    // 👇 Uncomment to enable the different browsers 
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'Safari',
    //   use: { ...devices['Desktop Safari'] },
    // },


    // 👇 Uncomment to enable the different mobiles 
    // {
    //   name: '📱 Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },

    // {
    //   name: '📱 Safari',
    //   use: { ...devices['iPhone 13'] },
    // },


  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

