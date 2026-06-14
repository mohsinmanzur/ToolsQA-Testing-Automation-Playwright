const BasePage = require('./BasePage');
const logger = require('../utils/logger');

class AlertsPage extends BasePage {
  static SELECTORS = {
    // Alerts
    ALERT_BTN:           '#alertButton',
    TIMER_ALERT_BTN:     '#timerAlertButton',
    CONFIRM_BTN:         '#confirmButton',
    PROMPT_BTN:          '#promtButton',
    CONFIRM_RESULT:      '#confirmResult',
    PROMPT_RESULT:       '#promptResult',

    // Browser Windows
    NEW_TAB_BTN:         '#tabButton',
    NEW_WINDOW_BTN:      '#windowButton',

    // Modal Dialogs
    SMALL_MODAL_BTN:     '#showSmallModal',
    LARGE_MODAL_BTN:     '#showLargeModal',
    CLOSE_SMALL_MODAL:   '#closeSmallModal',
    MODAL_TITLE:         '.modal-title'
  };

  async navigateToAlerts() {
    await this.navigate('/alerts');
    await this.waitForElement(AlertsPage.SELECTORS.ALERT_BTN);
  }

  async clickAlertButton() {
    await this.page.click(AlertsPage.SELECTORS.ALERT_BTN);
  }

  async clickTimerAlertButton() {
    await this.page.click(AlertsPage.SELECTORS.TIMER_ALERT_BTN);
  }

  async acceptConfirmAlert() {
    this.page.once('dialog', async (dialog) => {
      logger.info(`Confirm dialog: "${dialog.message()}"`);
      await dialog.accept();
    });
    await this.page.click(AlertsPage.SELECTORS.CONFIRM_BTN);
  }

  async dismissConfirmAlert() {
    this.page.once('dialog', async (dialog) => {
      logger.info(`Confirm dialog dismissed: "${dialog.message()}"`);
      await dialog.dismiss();
    });
    await this.page.click(AlertsPage.SELECTORS.CONFIRM_BTN);
  }

  async acceptPromptAlert(text) {
    this.page.once('dialog', async (dialog) => {
      logger.info(`Prompt dialog: "${dialog.message()}"`);
      await dialog.accept(text);
    });
    await this.page.click(AlertsPage.SELECTORS.PROMPT_BTN);
  }

  async getConfirmResult() {
    await this.waitForElement(AlertsPage.SELECTORS.CONFIRM_RESULT);
    return await this.page.textContent(AlertsPage.SELECTORS.CONFIRM_RESULT);
  }

  async getPromptResult() {
    await this.waitForElement(AlertsPage.SELECTORS.PROMPT_RESULT);
    return await this.page.textContent(AlertsPage.SELECTORS.PROMPT_RESULT);
  }

  async navigateToBrowserWindows() {
    await this.navigate('/browser-windows');
    await this.waitForElement(AlertsPage.SELECTORS.NEW_TAB_BTN);
  }

  async clickNewTab(context) {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.page.click(AlertsPage.SELECTORS.NEW_TAB_BTN)
    ]);
    await newPage.waitForLoadState();
    logger.debug('New tab opened');
    return newPage;
  }

  async clickNewWindow(context) {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.page.click(AlertsPage.SELECTORS.NEW_WINDOW_BTN)
    ]);
    await newPage.waitForLoadState();
    logger.debug('New window opened');
    return newPage;
  }

  async navigateToModalDialogs() {
    await this.navigate('/modal-dialogs');
    await this.waitForElement(AlertsPage.SELECTORS.SMALL_MODAL_BTN);
  }

  async openSmallModal() {
    await this.page.click(AlertsPage.SELECTORS.SMALL_MODAL_BTN);
    await this.waitForElement(AlertsPage.SELECTORS.MODAL_TITLE);
  }

  async getModalTitle() {
    return await this.page.textContent(AlertsPage.SELECTORS.MODAL_TITLE);
  }

  async closeSmallModal() {
    await this.page.click(AlertsPage.SELECTORS.CLOSE_SMALL_MODAL);
  }
}

module.exports = AlertsPage;
