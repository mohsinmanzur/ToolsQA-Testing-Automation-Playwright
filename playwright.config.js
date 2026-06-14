const { defineConfig, devices } = require('@playwright/test');
const config = require('./utils/configReader');

module.exports = defineConfig({
  testDir: './tests',
  globalSetup: './hooks/globalSetup.js',
  timeout: config.timeouts.default,
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
    ['list']
  ],
  use: {
    baseURL: config.baseURL,
    headless: true,
    actionTimeout: config.timeouts.element,
    navigationTimeout: config.timeouts.navigation,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
