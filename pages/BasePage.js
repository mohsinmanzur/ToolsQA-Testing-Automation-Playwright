const waitUtils = require('../utils/waitUtils');
const screenshotUtil = require('../utils/screenshotUtil');
const logger = require('../utils/logger');
const config = require('../utils/configReader');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    logger.debug(`Navigating to: ${url}`);
    await this.page.goto(url);
  }

  async waitForElement(locator, timeout) {
    return await this.page.waitForSelector(locator, {
      state: 'visible',
      timeout: timeout || config.timeouts.element
    });
  }

  async takeScreenshot(name) {
    return await screenshotUtil.capture(this.page, name);
  }

  async handleAlert(action) {
    this.page.once('dialog', async (dialog) => {
      logger.info(`Dialog appeared: "${dialog.message()}" — ${action}ing`);
      if (action === 'accept') await dialog.accept();
      else await dialog.dismiss();
    });
  }
}

module.exports = BasePage;
