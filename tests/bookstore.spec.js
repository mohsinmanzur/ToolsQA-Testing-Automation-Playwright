const { test, expect } = require('@playwright/test');
const BookStorePage = require('../pages/BookStorePage');
const config = require('../utils/configReader');
const screenshotUtil = require('../utils/screenshotUtil');
const logger = require('../utils/logger');

let bookStorePage;

test.describe('Book Store', () => {

  test.beforeAll(async ({ browser }) => {
    logger.info(`=== Suite: Book Store — browser: ${browser.browserType().name()} ===`);
  });

  test.afterAll(async () => {
    logger.info('=== Suite: Book Store complete ===');
  });

  test.beforeEach(async ({ page }) => {
    bookStorePage = new BookStorePage(page);
    await bookStorePage.navigateToBookStore();
    logger.info('Navigated to book store');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      logger.error(`Test failed: ${testInfo.title}`);
      await screenshotUtil.capture(page, testInfo.title);
    }
    logger.info(`Test "${testInfo.title}" — ${testInfo.status}`);
  });

  test('Book store page loads and displays books', async ({ page }) => {
    const titles = await bookStorePage.getVisibleBookTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test('User can search for a book by title', async ({ page }) => {
    await bookStorePage.searchBook(config.testData.bookSearch);
    const titles = await bookStorePage.getVisibleBookTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test('Search returns matching book titles only', async ({ page }) => {
    await bookStorePage.searchBook(config.testData.bookSearch);
    const titles = await bookStorePage.getVisibleBookTitles();
    for (const title of titles) {
      expect(title.toLowerCase()).toContain(config.testData.bookSearch.toLowerCase());
    }
  });

  test('Clicking a book opens its detail page', async ({ page }) => {
    await bookStorePage.clickFirstBook();
    expect(page.url()).toContain('/books?book=');
  });

  test('Book detail page shows ISBN field', async ({ page }) => {
    await bookStorePage.clickFirstBook();
    const isVisible = await bookStorePage.isISBNFieldVisible();
    expect(isVisible).toBe(true);
  });

  test('Logged-in user can navigate to their profile', async ({ page }) => {
    await bookStorePage.navigateToProfile();
    const onProfile = await bookStorePage.isOnProfilePage();
    expect(onProfile).toBe(true);
  });

});
