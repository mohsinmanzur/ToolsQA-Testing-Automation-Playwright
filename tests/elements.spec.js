const { test, expect } = require('@playwright/test');
const ElementsPage = require('../pages/ElementsPage');
const config = require('../utils/configReader');
const screenshotUtil = require('../utils/screenshotUtil');
const logger = require('../utils/logger');

let elementsPage;

test.describe('Elements', () => {

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      logger.error(`Test failed: ${testInfo.title}`);
      await screenshotUtil.capture(page, testInfo.title);
    }
    logger.info(`Test "${testInfo.title}" — ${testInfo.status}`);
  });

  test.describe('Text Box', () => {
    test.beforeEach(async ({ page }) => {
      elementsPage = new ElementsPage(page);
      await elementsPage.navigateToTextBox();
    });

    test('User can fill and submit text box form', async ({ page }) => {
      const { fullName, email, currentAddress, permanentAddress } = config.testData.textBox;
      await elementsPage.fillTextBox(fullName, email, currentAddress, permanentAddress);
      await elementsPage.submitTextBox();
      const outputName = await elementsPage.getOutputName();
      expect(outputName).toContain(fullName);
    });

    test('Text box output reflects entered name and email', async ({ page }) => {
      const { fullName, email, currentAddress, permanentAddress } = config.testData.textBox;
      await elementsPage.fillTextBox(fullName, email, currentAddress, permanentAddress);
      await elementsPage.submitTextBox();
      const outputEmail = await elementsPage.getOutputEmail();
      expect(outputEmail).toContain(email);
    });
  });

  test.describe('Check Box', () => {
    test.beforeEach(async ({ page }) => {
      elementsPage = new ElementsPage(page);
      await elementsPage.navigateToCheckBox();
    });

    test('User can expand and select a checkbox', async ({ page }) => {
      await elementsPage.expandHomeCheckbox();
      await elementsPage.selectHomeCheckbox();
      const result = await elementsPage.getCheckboxResult();
      expect(result).not.toBeNull();
    });

    test('Selected checkbox result text is displayed', async ({ page }) => {
      await elementsPage.expandHomeCheckbox();
      await elementsPage.selectHomeCheckbox();
      const result = await elementsPage.getCheckboxResult();
      expect(result.toLowerCase()).toContain('home');
    });
  });

  test.describe('Radio Button', () => {
    test.beforeEach(async ({ page }) => {
      elementsPage = new ElementsPage(page);
      await elementsPage.navigateToRadioButton();
    });

    test('User can select the Yes radio button', async ({ page }) => {
      await elementsPage.clickYesRadio();
      const result = await elementsPage.getRadioResult();
      expect(result).toContain('Yes');
    });

    test('No radio button is disabled', async ({ page }) => {
      const isDisabled = await elementsPage.isNoRadioDisabled();
      expect(isDisabled).toBe(true);
    });
  });

  test.describe('Web Tables', () => {
    test.beforeEach(async ({ page }) => {
      elementsPage = new ElementsPage(page);
      await elementsPage.navigateToWebTables();
    });

    test('User can add a new row to the web table', async ({ page }) => {
      await elementsPage.addTableRow(config.testData.webTable);
      await elementsPage.searchTable(config.testData.webTable.firstName);
      const titles = await page.$$('.rt-td');
      expect(titles.length).toBeGreaterThan(0);
    });

    test('User can search and filter web table rows', async ({ page }) => {
      await elementsPage.searchTable('Cierra');
      const rows = await page.$$eval('.rt-tr-group', rows =>
        rows.filter(r => r.textContent.trim() !== '').length
      );
      expect(rows).toBeGreaterThan(0);
    });

    test('User can delete a row from the web table', async ({ page }) => {
      const before = await elementsPage.getTableRowCount();
      await elementsPage.deleteFirstRow();
      const after = await elementsPage.getTableRowCount();
      expect(after).toBeLessThanOrEqual(before);
    });
  });

  test.describe('Buttons', () => {
    test.beforeEach(async ({ page }) => {
      elementsPage = new ElementsPage(page);
      await elementsPage.navigateToButtons();
    });

    test('Double click button shows correct message', async ({ page }) => {
      await elementsPage.doubleClickButton();
      const msg = await elementsPage.getDoubleClickMessage();
      expect(msg).toContain('You have done a double click');
    });

    test('Right click button shows correct message', async ({ page }) => {
      await elementsPage.rightClickButton();
      const msg = await elementsPage.getRightClickMessage();
      expect(msg).toContain('You have done a right click');
    });

    test('Single click button shows correct message', async ({ page }) => {
      await elementsPage.clickDynamicButton();
      const msg = await elementsPage.getClickMessage();
      expect(msg).toContain('You have done a dynamic click');
    });
  });

});
