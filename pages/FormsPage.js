const BasePage = require('./BasePage');
const logger = require('../utils/logger');

class FormsPage extends BasePage {
  static SELECTORS = {
    FIRST_NAME:       '#firstName',
    LAST_NAME:        '#lastName',
    EMAIL:            '#userEmail',
    GENDER_MALE:      '[for="gender-radio-1"]',
    MOBILE:           '#userNumber',
    DOB_INPUT:        '#dateOfBirthInput',
    SUBJECTS_INPUT:   '#subjectsInput',
    HOBBY_SPORTS:     '[for="hobbies-checkbox-1"]',
    ADDRESS:          '#currentAddress',
    STATE_DROPDOWN:   '#state',
    CITY_DROPDOWN:    '#city',
    SUBMIT_BTN:       '#submit',
    MODAL_TITLE:      '#example-modal-sizes-title-lg',
    MODAL_TABLE:      '.table-responsive',
    MODAL_CLOSE:      '#closeLargeModal'
  };

  async navigateToPracticeForm() {
    await this.navigate('/automation-practice-form');
    await this.waitForElement(FormsPage.SELECTORS.FIRST_NAME);
  }

  async fillName(firstName, lastName) {
    await this.page.fill(FormsPage.SELECTORS.FIRST_NAME, firstName);
    await this.page.fill(FormsPage.SELECTORS.LAST_NAME, lastName);
  }

  async fillEmail(email) {
    await this.page.fill(FormsPage.SELECTORS.EMAIL, email);
  }

  async selectMaleGender() {
    await this.page.click(FormsPage.SELECTORS.GENDER_MALE);
  }

  async fillMobile(mobile) {
    await this.page.fill(FormsPage.SELECTORS.MOBILE, mobile);
  }

  async fillAddress(address) {
    await this.page.fill(FormsPage.SELECTORS.ADDRESS, address);
  }

  async selectState(state) {
    await this.page.click(FormsPage.SELECTORS.STATE_DROPDOWN);
    await this.page.click(`.css-26l3qy-menu div:has-text("${state}") >> nth=0`);
  }

  async selectCity(city) {
    await this.page.click(FormsPage.SELECTORS.CITY_DROPDOWN);
    await this.page.click(`.css-26l3qy-menu div:has-text("${city}") >> nth=0`);
  }

  async submitForm() {
    await this.page.click(FormsPage.SELECTORS.SUBMIT_BTN);
    await this.waitForElement(FormsPage.SELECTORS.MODAL_TITLE);
    logger.debug('Practice form submitted');
  }

  async getModalTitle() {
    return await this.page.textContent(FormsPage.SELECTORS.MODAL_TITLE);
  }

  async getModalTableText() {
    await this.waitForElement(FormsPage.SELECTORS.MODAL_TABLE);
    return await this.page.textContent(FormsPage.SELECTORS.MODAL_TABLE);
  }

  async closeModal() {
    await this.page.click(FormsPage.SELECTORS.MODAL_CLOSE);
  }
}

module.exports = FormsPage;
