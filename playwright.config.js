// @ts-check
const { defineConfig, devices } = require('@playwright/test');

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
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* HTML report; do not auto-open the browser after a run */
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    /* Lets tests call page.goto('/') instead of repeating the full URL */
    baseURL: 'https://www.saucedemo.com',
    /* Sauce Demo uses data-test attributes; make getByTestId() target them */
    testIdAttribute: 'data-test',
    /* Debugging artefacts: keep screenshot and trace only when a test fails */
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
