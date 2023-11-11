// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  
  // retries:3,


  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://app.uat.app.lantern.ai/#state=eyJpZCI6ImMzNDEwYTY0LTIxYjItNDRjNi1hNWM2LTQxNzE0ZTM4YTU4NyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d&client_info=eyJ1aWQiOiJmZjk3ZGE1OC01YTMxLTQzNTQtOGFmZi00NDZhNDllMzY2OTEtYjJjXzFhX3NpZ25pbl90b3VfdG90cCIsInV0aWQiOiIxNDA3ZGEwZC0xY2E5LTQ0YzktYWFlMS0zNzc5ZDBkZmExM2YifQ&code=eyJraWQiOiJlMlFYRFBrYlB1YjhzRm1TTUI2SVdTWXMyS3IwbnpkTHQyQ3g0WmVfd1BFIiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.md_0T7MEgCg5kFQnHFHHs5ZFc3YKrY4r4dS2Hj7XTahUD_KLXqRi8edcanjuzsfKo9mg3mNDosmEPXSusNBLROVRcfwUTwuxzXgIcX_EIoQ_D1_7SOafMqQcA9-Qi6jW9ELM19zyAFlpucX4WRUP_cQV4kl-tEMInFG_o5bpLezLNB-_PkxhwXa0La4q3_6BEq4lm77LnGxIrKy7v6sAYj4JAmVYWJX6QyvssuvEQIoG4TDuGsDoEkw9JwVkjXu2PinlkXBIcLXcmA7w4PnfgFya3dYsL2xHUwn_Ib_rhsJVuheub3vmnDKMy-CaWBezVZWPeyHbhxNVl-FpKpeSoA.M9km7f7LOysZh_3S.hNJeiCbED70VokEdfd7j1vhGiPM9qPedoe9ttAj05bLTp6LrHQbdRtVtkaxA8AUc1xekIaM1Xg43m3i6KD6IwS8Kjd7Bz6h_tOm5J-ItrugCUow7QdwR-Lf7DlmzrAu41XRg-evNhSmazH8oXk-2h8QWdht3QpLL-spnToFNN1Qj67peB-AtcmufQ5jxuby_hskhjomAEnz_xZbLOVGLr0nJzHAW7y-3L2osEravZ3kKDh4xldbmVxCV6dfQRpksmMSN-Emav7LZ25xvkf-m0EH0BLESQ37cDaOlgl1mbAsWbAnRmPyqGywxlrcgHulqpQzZm8rqupA4AeLS0qQqq4AZAPpoZ6baaoozRYPGvEElUUprQrjIvWN8qsHSRtDLOlBSvxZbDhGT6MoKK7eHFhokYk9_h9Z7pZbyToXEqvWrK_wpzX9ON6oe9izHtjyE-y2vLDgYBYpKD5x0n25A3z-h5lBMj_41wxBisdzW3ZUNq6lb6ASTCye4MuMCFi7GeMxsSFVC6e_U5YYYXzXpGVbCsaWyS-iuXcBYXrzKq8XPspoPKHaz9UrSnhypgFabrG-qjLU-b5uh6DPm1iElgXyct6LEjgKEdhMUTgrcaklSqPSFP2Seh5JdSayWfluLjv_f1Xa45AetSq3dj938hsO1aSplL3rNVFZgiWv2JiW_EjQM08t4ipYLaG2Qlxoj8JCjxfA_boFUC8pkQAAfJG_VeBszn66tGcFGDdLTeJibzTFJcH_RDjSR_LoGx_MNxJzfb9XAuLGvF5myNRwhzba9TbLOSpWiAct44V0Oe51G_cfE8yPuGamVhxpARwDceURHeNd56y85tKG6ixgAM2-7Zp-ObrTb4i3C4OOEV1owXjA8CbDTzdFbTTFyyxtHPGRP-U8iXIml8QPkwkwJjcUnqPLTlJVfAjfDYPN4KaHVg0G0xAKZANZBoQEBj5gHz5I_pnQuO8isUC6qYjLazRAuZP5itykLia_OF2iLVk-wekMwzPoSHOUlxQVVmgdV6fsnLaQC-aPa2R1RJRhNVhsaLHCo2YGdXav20khf5WfxIzYXkvMZl_7PIcp6ZnvSX5ujS3N7bZWmarTIAgMlcDZCkC8yOD-Zddpo4GLF.TkMdU20qgIJ9tBHMlnpjfw',

    // 👇 Here is to slow down the speed of the test run. 
    // launchOptions: {
    //   slowMo: 1000,
      headless: false, 
    // },  

    // 👇 Here is to record video of test run 
    trace: 'on-first-retry',
    video: 'retain-on-failure', // "on", "off", "on-first-retry", "retain-on-failure"
    
    

  },

  /* Configure projects for major browsers */
  projects: [

    // 👇 Uncomment to enable the different browsers 
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },

      // {
      //   name: 'firefox',
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

