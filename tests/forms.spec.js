const { test, expect } = require('@playwright/test');
const FormsPage = require('../pages/FormsPage');
const config = require('../utils/configReader');
const screenshotUtil = require('../utils/screenshotUtil');
const logger = require('../utils/logger');

let formsPage;

test.describe('Practice Form', () => {

  test.beforeEach(async ({ page }) => {
    formsPage = new FormsPage(page);
    await formsPage.navigateToPracticeForm();
    logger.info('Navigated to practice form');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      logger.error(`Test failed: ${testInfo.title}`);
      await screenshotUtil.capture(page, testInfo.title);
    }
    logger.info(`Test "${testInfo.title}" — ${testInfo.status}`);
  });

  test('User can fill all required fields and submit the practice form', async ({ page }) => {
    const d = config.testData.practiceForm;
    await formsPage.fillName(d.firstName, d.lastName);
    await formsPage.fillEmail(d.email);
    await formsPage.selectMaleGender();
    await formsPage.fillMobile(d.mobile);
    await formsPage.fillAddress(d.address);
    await formsPage.submitForm();
    const title = await formsPage.getModalTitle();
    expect(title).toContain('Thanks for submitting the form');
  });

  test('Form submission modal shows entered first and last name', async ({ page }) => {
    const d = config.testData.practiceForm;
    await formsPage.fillName(d.firstName, d.lastName);
    await formsPage.fillEmail(d.email);
    await formsPage.selectMaleGender();
    await formsPage.fillMobile(d.mobile);
    await formsPage.submitForm();
    const tableText = await formsPage.getModalTableText();
    expect(tableText).toContain(`${d.firstName} ${d.lastName}`);
  });

  test('Form submission modal shows entered email', async ({ page }) => {
    const d = config.testData.practiceForm;
    await formsPage.fillName(d.firstName, d.lastName);
    await formsPage.fillEmail(d.email);
    await formsPage.selectMaleGender();
    await formsPage.fillMobile(d.mobile);
    await formsPage.submitForm();
    const tableText = await formsPage.getModalTableText();
    expect(tableText).toContain(d.email);
  });

  test('Form submission modal shows selected gender', async ({ page }) => {
    const d = config.testData.practiceForm;
    await formsPage.fillName(d.firstName, d.lastName);
    await formsPage.fillEmail(d.email);
    await formsPage.selectMaleGender();
    await formsPage.fillMobile(d.mobile);
    await formsPage.submitForm();
    const tableText = await formsPage.getModalTableText();
    expect(tableText).toContain('Male');
  });

  test('Form submission modal shows entered mobile number', async ({ page }) => {
    const d = config.testData.practiceForm;
    await formsPage.fillName(d.firstName, d.lastName);
    await formsPage.fillEmail(d.email);
    await formsPage.selectMaleGender();
    await formsPage.fillMobile(d.mobile);
    await formsPage.submitForm();
    const tableText = await formsPage.getModalTableText();
    expect(tableText).toContain(d.mobile);
  });

});
