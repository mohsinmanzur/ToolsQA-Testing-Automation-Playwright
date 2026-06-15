const BasePage = require('./BasePage');
const waitUtils = require('../utils/waitUtils');
const logger = require('../utils/logger');

class LoginPage extends BasePage {
  static SELECTORS = {
    USERNAME_INPUT:   '#userName',
    PASSWORD_INPUT:   '#password',
    LOGIN_BUTTON:     '#login',
    LOGOUT_BUTTON:    '#submit',
    ERROR_MESSAGE:    '.mb-1',
    PROFILE_USERNAME: '#userName-value'
  };

  async navigateToLogin() {
    await this.navigate('/login');
    await this.waitForElement(LoginPage.SELECTORS.USERNAME_INPUT);
    logger.debug('Login page loaded');
  }

  async enterUsername(username) {
    await this.waitForElement(LoginPage.SELECTORS.USERNAME_INPUT);
    await this.page.fill(LoginPage.SELECTORS.USERNAME_INPUT, username);
  }

  async enterPassword(password) {
    await this.waitForElement(LoginPage.SELECTORS.PASSWORD_INPUT);
    await this.page.fill(LoginPage.SELECTORS.PASSWORD_INPUT, password);
  }

  async clickLoginButton() {
    await this.waitForElement(LoginPage.SELECTORS.LOGIN_BUTTON);
    await this.page.click(LoginPage.SELECTORS.LOGIN_BUTTON);
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    logger.info(`Login attempted with username: ${username}`);
  }

  async getErrorMessage() {
    await this.waitForElement(LoginPage.SELECTORS.ERROR_MESSAGE);
    return await this.page.textContent(LoginPage.SELECTORS.ERROR_MESSAGE);
  }

  async getLoggedInUsername() {
    await this.waitForElement(LoginPage.SELECTORS.PROFILE_USERNAME);
    return await this.page.textContent(LoginPage.SELECTORS.PROFILE_USERNAME);
  }

  async isOnProfilePage() {
    await waitUtils.waitForURL(this.page, /\/profile/);
    return this.page.url().includes('/profile');
  }

  async logout() {
    await this.navigate('/profile');
    await this.waitForElement(LoginPage.SELECTORS.LOGOUT_BUTTON);
    await this.page.click(LoginPage.SELECTORS.LOGOUT_BUTTON);
    await waitUtils.waitForURL(this.page, /\/login/);
    logger.info('Logged out successfully');
  }
}

module.exports = LoginPage;
