const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  retries: 2, //Number of retries before fail

  // Reporter configuration
  reporter: [

    ['html', { open: 'always' }] //'always', 'never', or 'on-failure'.


  ],

  // Global test settings
  use: {
    baseURL: 'https://app.uat.app.lantern.ai/',
    headless: false,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    actionTimeout: 10000,
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
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },

    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },


  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

