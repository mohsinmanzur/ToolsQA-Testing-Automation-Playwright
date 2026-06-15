const { test, expect } = require('@playwright/test');
const WidgetsPage = require('../pages/WidgetsPage');
const screenshotUtil = require('../utils/screenshotUtil');
const logger = require('../utils/logger');

let widgetsPage;

test.describe('Widgets', () => {

  test.beforeAll(async ({ browser }) => {
    logger.info(`=== Suite: Widgets — browser: ${browser.browserType().name()} ===`);
  });

  test.afterAll(async () => {
    logger.info('=== Suite: Widgets complete ===');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      logger.error(`Test failed: ${testInfo.title}`);
      await screenshotUtil.capture(page, testInfo.title);
    }
    logger.info(`Test "${testInfo.title}" — ${testInfo.status}`);
  });

  test.describe('Accordian', () => {
    test.beforeEach(async ({ page }) => {
      widgetsPage = new WidgetsPage(page);
      await widgetsPage.navigateToAccordian();
    });

    test('First accordion section is open by default', async ({ page }) => {
      const isVisible = await widgetsPage.isSection1ContentVisible();
      expect(isVisible).toBe(true);
    });

    test('User can open the second accordion section', async ({ page }) => {
      await widgetsPage.clickSection2();
      const isVisible = await widgetsPage.isSection2ContentVisible();
      expect(isVisible).toBe(true);
    });
  });

  test.describe('Tabs', () => {
    test.beforeEach(async ({ page }) => {
      widgetsPage = new WidgetsPage(page);
      await widgetsPage.navigateToTabs();
    });

    test('What tab is active by default', async ({ page }) => {
      const isActive = await widgetsPage.isWhatTabActive();
      expect(isActive).toBe(true);
    });

    test('User can switch to the Origin tab', async ({ page }) => {
      await widgetsPage.clickOriginTab();
      const isVisible = await widgetsPage.isOriginContentVisible();
      expect(isVisible).toBe(true);
    });
  });

  test.describe('Date Picker', () => {
    test.beforeEach(async ({ page }) => {
      widgetsPage = new WidgetsPage(page);
      await widgetsPage.navigateToDatePicker();
    });

    test('User can select a date from the date picker', async ({ page }) => {
      await widgetsPage.setDate('01/15/2025');
      const value = await widgetsPage.getDateValue();
      expect(value).toContain('01/15/2025');
    });
  });

  test.describe('Slider', () => {
    test.beforeEach(async ({ page }) => {
      widgetsPage = new WidgetsPage(page);
      await widgetsPage.navigateToSlider();
    });

    test('User can move the slider to a specific value', async ({ page }) => {
      await widgetsPage.setSliderValue(75);
      const value = await widgetsPage.getSliderValue();
      expect(Number(value)).toBe(75);
    });
  });

});
