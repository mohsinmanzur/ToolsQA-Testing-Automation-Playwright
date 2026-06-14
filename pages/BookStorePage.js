const BasePage = require('./BasePage');
const logger = require('../utils/logger');

class BookStorePage extends BasePage {
  static SELECTORS = {
    SEARCH_BOX:       '#searchBox',
    BOOK_ROWS:        '.rt-tr-group .rt-td:first-child a',
    BOOK_TITLE:       '#title-wrapper #userName-value',
    ISBN_LABEL:       '#ISBN-wrapper label',
    ISBN_VALUE:       '#ISBN-wrapper #userName-value',
    PROFILE_BTN:      '#gotoStore',
    LOGIN_BTN:        '#login',
    HEADER:           '.main-header'
  };

  async navigateToBookStore() {
    await this.navigate('/books');
    await this.waitForElement(BookStorePage.SELECTORS.SEARCH_BOX);
    logger.debug('Book store page loaded');
  }

  async getBookCount() {
    const books = await this.page.$$(BookStorePage.SELECTORS.BOOK_ROWS);
    return books.filter(async b => (await b.textContent()).trim() !== '').length;
  }

  async searchBook(term) {
    await this.page.fill(BookStorePage.SELECTORS.SEARCH_BOX, term);
    logger.debug(`Searching books for: ${term}`);
  }

  async getVisibleBookTitles() {
    const anchors = await this.page.$$(BookStorePage.SELECTORS.BOOK_ROWS);
    const titles = [];
    for (const a of anchors) {
      const text = (await a.textContent()).trim();
      if (text) titles.push(text);
    }
    return titles;
  }

  async clickFirstBook() {
    await this.page.click(`${BookStorePage.SELECTORS.BOOK_ROWS} >> nth=0`);
    logger.debug('Clicked first book in list');
  }

  async getBookDetailTitle() {
    await this.waitForElement(BookStorePage.SELECTORS.BOOK_TITLE);
    return await this.page.textContent(BookStorePage.SELECTORS.BOOK_TITLE);
  }

  async isISBNFieldVisible() {
    return await this.page.isVisible(BookStorePage.SELECTORS.ISBN_VALUE);
  }

  async navigateToProfile() {
    await this.navigate('/profile');
    await this.waitForElement(BookStorePage.SELECTORS.LOGIN_BTN);
  }

  async isOnProfilePage() {
    return this.page.url().includes('/profile');
  }
}

module.exports = BookStorePage;
