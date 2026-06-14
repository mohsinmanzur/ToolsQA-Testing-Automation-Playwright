const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const config = require('../utils/configReader');
const screenshotUtil = require('../utils/screenshotUtil');
const logger = require('../utils/logger');

let loginPage;

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    logger.info('Navigated to login page');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      logger.error(`Test failed: ${testInfo.title}`);
      await screenshotUtil.capture(page, testInfo.title);
    }
    logger.info(`Test "${testInfo.title}" — ${testInfo.status}`);
  });

  test('User can login with valid credentials', async ({ page }) => {
    const { username, password } = config.credentials.valid;
    await loginPage.login(username, password);
    const onProfile = await loginPage.isOnProfilePage();
    expect(onProfile).toBe(true);
  });

  test('User sees error message with invalid credentials', async ({ page }) => {
    const { username, password } = config.credentials.invalid;
    await loginPage.login(username, password);
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Invalid username or password!');
  });

  test('Logged-in username is displayed on profile page', async ({ page }) => {
    const { username, password } = config.credentials.valid;
    await loginPage.login(username, password);
    const displayedUsername = await loginPage.getLoggedInUsername();
    expect(displayedUsername).toBe(username);
  });

});
