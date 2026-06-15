const BasePage = require('./BasePage');
const logger = require('../utils/logger');

class ElementsPage extends BasePage {
  static SELECTORS = {
    // Text Box
    FULL_NAME:          '#userName',
    EMAIL:              '#userEmail',
    CURRENT_ADDRESS:    '#currentAddress',
    PERMANENT_ADDRESS:  '#permanentAddress',
    SUBMIT_BTN:         '#submit',
    OUTPUT_NAME:        '#name',
    OUTPUT_EMAIL:       '#email',

    // Check Box
    HOME_CHECKBOX:      '.rct-icon-expand-close',
    HOME_TOGGLE:        '.rct-option-expand-all',
    RESULT_CHECKBOX:    '.text-success',

    // Radio Button
    YES_RADIO:          '[for="yesRadio"]',
    IMPRESSIVE_RADIO:   '[for="impressiveRadio"]',
    NO_RADIO:           '[for="noRadio"]',
    RADIO_RESULT:       '.mt-3',

    // Web Tables
    ADD_BTN:            '#addNewRecordButton',
    FIRST_NAME_INPUT:   '#firstName',
    LAST_NAME_INPUT:    '#lastName',
    EMAIL_INPUT:        '#userEmail',
    AGE_INPUT:          '#age',
    SALARY_INPUT:       '#salary',
    DEPT_INPUT:         '#department',
    SUBMIT_FORM:        '#submit',
    SEARCH_BOX:         '#searchBox',
    DELETE_BTN:         '[title="Delete"]',
    TABLE_ROWS:         '.rt-tr-group',
    TABLE_CELLS:        '.rt-td',

    // Buttons
    DOUBLE_CLICK_BTN:   '#doubleClickBtn',
    RIGHT_CLICK_BTN:    '#rightClickBtn',
    CLICK_ME_BTN:       '.btn-primary:not(#doubleClickBtn):not(#rightClickBtn)',
    DOUBLE_CLICK_MSG:   '#doubleClickMessage',
    RIGHT_CLICK_MSG:    '#rightClickMessage',
    CLICK_MSG:          '#dynamicClickMessage'
  };

  async navigateToTextBox() {
    await this.navigate('/text-box');
    await this.waitForElement(ElementsPage.SELECTORS.FULL_NAME);
  }

  async fillTextBox(fullName, email, currentAddress, permanentAddress) {
    await this.page.fill(ElementsPage.SELECTORS.FULL_NAME, fullName);
    await this.page.fill(ElementsPage.SELECTORS.EMAIL, email);
    await this.page.fill(ElementsPage.SELECTORS.CURRENT_ADDRESS, currentAddress);
    await this.page.fill(ElementsPage.SELECTORS.PERMANENT_ADDRESS, permanentAddress);
    logger.debug('Text box form filled');
  }

  async submitTextBox() {
    await this.page.click(ElementsPage.SELECTORS.SUBMIT_BTN);
  }

  async getOutputName() {
    await this.waitForElement(ElementsPage.SELECTORS.OUTPUT_NAME);
    return await this.page.textContent(ElementsPage.SELECTORS.OUTPUT_NAME);
  }

  async getOutputEmail() {
    await this.waitForElement(ElementsPage.SELECTORS.OUTPUT_EMAIL);
    return await this.page.textContent(ElementsPage.SELECTORS.OUTPUT_EMAIL);
  }

  async navigateToCheckBox() {
    await this.navigate('/checkbox');
    await this.waitForElement(ElementsPage.SELECTORS.HOME_TOGGLE);
  }

  async expandHomeCheckbox() {
    await this.page.click(ElementsPage.SELECTORS.HOME_CHECKBOX);
  }

  async selectHomeCheckbox() {
    await this.page.click('.rct-checkbox >> nth=0');
  }

  async getCheckboxResult() {
    await this.waitForElement(ElementsPage.SELECTORS.RESULT_CHECKBOX);
    return await this.page.textContent(ElementsPage.SELECTORS.RESULT_CHECKBOX);
  }

  async navigateToRadioButton() {
    await this.navigate('/radio-button');
    await this.waitForElement(ElementsPage.SELECTORS.YES_RADIO);
  }

  async clickYesRadio() {
    await this.page.click(ElementsPage.SELECTORS.YES_RADIO);
  }

  async getRadioResult() {
    await this.waitForElement(ElementsPage.SELECTORS.RADIO_RESULT);
    return await this.page.textContent(ElementsPage.SELECTORS.RADIO_RESULT);
  }

  async isNoRadioDisabled() {
    return await this.page.isDisabled('#noRadio');
  }

  async navigateToWebTables() {
    await this.navigate('/webtables');
    await this.waitForElement(ElementsPage.SELECTORS.ADD_BTN);
  }

  async addTableRow(data) {
    await this.page.click(ElementsPage.SELECTORS.ADD_BTN);
    await this.page.fill(ElementsPage.SELECTORS.FIRST_NAME_INPUT, data.firstName);
    await this.page.fill(ElementsPage.SELECTORS.LAST_NAME_INPUT, data.lastName);
    await this.page.fill(ElementsPage.SELECTORS.EMAIL_INPUT, data.email);
    await this.page.fill(ElementsPage.SELECTORS.AGE_INPUT, data.age);
    await this.page.fill(ElementsPage.SELECTORS.SALARY_INPUT, data.salary);
    await this.page.fill(ElementsPage.SELECTORS.DEPT_INPUT, data.department);
    await this.page.click(ElementsPage.SELECTORS.SUBMIT_FORM);
    logger.debug(`Added table row for ${data.firstName} ${data.lastName}`);
  }

  async searchTable(term) {
    await this.page.fill(ElementsPage.SELECTORS.SEARCH_BOX, term);
  }

  async getTableRowCount() {
    const rows = await this.page.$$(ElementsPage.SELECTORS.TABLE_ROWS);
    return rows.length;
  }

  async deleteFirstRow() {
    await this.page.click(`${ElementsPage.SELECTORS.DELETE_BTN} >> nth=0`);
  }

  async getTableCellCount() {
    const cells = await this.page.$$(ElementsPage.SELECTORS.TABLE_CELLS);
    return cells.length;
  }

  async getVisibleRowCount() {
    return await this.page.$$eval(ElementsPage.SELECTORS.TABLE_ROWS,
      rows => rows.filter(r => r.textContent.trim() !== '').length
    );
  }

  async navigateToButtons() {
    await this.navigate('/buttons');
    await this.waitForElement(ElementsPage.SELECTORS.DOUBLE_CLICK_BTN);
  }

  async doubleClickButton() {
    await this.page.dblclick(ElementsPage.SELECTORS.DOUBLE_CLICK_BTN);
  }

  async rightClickButton() {
    await this.page.click(ElementsPage.SELECTORS.RIGHT_CLICK_BTN, { button: 'right' });
  }

  async clickDynamicButton() {
    await this.page.click('button:has-text("Click Me")');
  }

  async getDoubleClickMessage() {
    await this.waitForElement(ElementsPage.SELECTORS.DOUBLE_CLICK_MSG);
    return await this.page.textContent(ElementsPage.SELECTORS.DOUBLE_CLICK_MSG);
  }

  async getRightClickMessage() {
    await this.waitForElement(ElementsPage.SELECTORS.RIGHT_CLICK_MSG);
    return await this.page.textContent(ElementsPage.SELECTORS.RIGHT_CLICK_MSG);
  }

  async getClickMessage() {
    await this.waitForElement(ElementsPage.SELECTORS.CLICK_MSG);
    return await this.page.textContent(ElementsPage.SELECTORS.CLICK_MSG);
  }
}

module.exports = ElementsPage;
