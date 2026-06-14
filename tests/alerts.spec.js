const { test, expect } = require('@playwright/test');
const AlertsPage = require('../pages/AlertsPage');
const screenshotUtil = require('../utils/screenshotUtil');
const logger = require('../utils/logger');

let alertsPage;

test.describe('Alerts, Frame & Windows', () => {

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      logger.error(`Test failed: ${testInfo.title}`);
      await screenshotUtil.capture(page, testInfo.title);
    }
    logger.info(`Test "${testInfo.title}" — ${testInfo.status}`);
  });

  test.describe('Alerts', () => {
    test.beforeEach(async ({ page }) => {
      alertsPage = new AlertsPage(page);
      await alertsPage.navigateToAlerts();
    });

    test('Simple alert appears and can be accepted', async ({ page }) => {
      let dialogMessage = '';
      page.once('dialog', async (dialog) => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });
      await alertsPage.clickAlertButton();
      expect(dialogMessage).toContain('You clicked a button');
    });

    test('Alert with timer appears after delay', async ({ page }) => {
      let dialogSeen = false;
      page.once('dialog', async (dialog) => {
        dialogSeen = true;
        await dialog.accept();
      });
      await alertsPage.clickTimerAlertButton();
      await page.waitForEvent('dialog', { timeout: 10000 }).catch(() => {});
      expect(dialogSeen).toBe(true);
    });

    test('Confirm alert accepted shows Ok response', async ({ page }) => {
      await alertsPage.acceptConfirmAlert();
      const result = await alertsPage.getConfirmResult();
      expect(result).toContain('Ok');
    });

    test('Confirm alert dismissed shows Cancel response', async ({ page }) => {
      await alertsPage.dismissConfirmAlert();
      const result = await alertsPage.getConfirmResult();
      expect(result).toContain('Cancel');
    });

    test('Prompt alert accepts typed text and shows it', async ({ page }) => {
      await alertsPage.acceptPromptAlert('Hello Playwright');
      const result = await alertsPage.getPromptResult();
      expect(result).toContain('Hello Playwright');
    });
  });

  test.describe('Browser Windows', () => {
    test.beforeEach(async ({ page }) => {
      alertsPage = new AlertsPage(page);
      await alertsPage.navigateToBrowserWindows();
    });

    test('New Tab button opens a new browser tab', async ({ page, context }) => {
      const newTab = await alertsPage.clickNewTab(context);
      expect(newTab.url()).toContain('sample');
      await newTab.close();
    });

    test('New Window button opens a new browser window', async ({ page, context }) => {
      const newWindow = await alertsPage.clickNewWindow(context);
      expect(newWindow.url()).toContain('sample');
      await newWindow.close();
    });
  });

  test.describe('Modal Dialogs', () => {
    test.beforeEach(async ({ page }) => {
      alertsPage = new AlertsPage(page);
      await alertsPage.navigateToModalDialogs();
    });

    test('Small modal dialog can be opened and closed', async ({ page }) => {
      await alertsPage.openSmallModal();
      const title = await alertsPage.getModalTitle();
      expect(title).toContain('Small Modal');
      await alertsPage.closeSmallModal();
      const isVisible = await page.isVisible('.modal-title');
      expect(isVisible).toBe(false);
    });
  });

});
