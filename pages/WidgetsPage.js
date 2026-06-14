const BasePage = require('./BasePage');
const logger = require('../utils/logger');

class WidgetsPage extends BasePage {
  static SELECTORS = {
    // Accordian
    SECTION1_HEADING:  '#section1Heading',
    SECTION2_HEADING:  '#section2Heading',
    SECTION1_CONTENT:  '#section1Content',
    SECTION2_CONTENT:  '#section2Content',

    // Tabs
    WHAT_TAB:          '#demo-tab-what',
    ORIGIN_TAB:        '#demo-tab-origin',
    WHAT_CONTENT:      '#demo-tabpane-what',
    ORIGIN_CONTENT:    '#demo-tabpane-origin',

    // Date Picker
    DATE_INPUT:        '#datePickerMonthYearInput',
    MONTH_SELECT:      '.react-datepicker__month-select',
    YEAR_SELECT:       '.react-datepicker__year-select',

    // Slider
    SLIDER_INPUT:      '.range-slider input[type="range"]',
    SLIDER_VALUE:      '#sliderValue'
  };

  async navigateToAccordian() {
    await this.navigate('/accordian');
    await this.waitForElement(WidgetsPage.SELECTORS.SECTION1_HEADING);
  }

  async isSection1ContentVisible() {
    return await this.page.isVisible(WidgetsPage.SELECTORS.SECTION1_CONTENT);
  }

  async clickSection2() {
    await this.page.click(WidgetsPage.SELECTORS.SECTION2_HEADING);
  }

  async isSection2ContentVisible() {
    return await this.page.isVisible(WidgetsPage.SELECTORS.SECTION2_CONTENT);
  }

  async navigateToTabs() {
    await this.navigate('/tabs');
    await this.waitForElement(WidgetsPage.SELECTORS.WHAT_TAB);
  }

  async isWhatTabActive() {
    const cls = await this.page.getAttribute(WidgetsPage.SELECTORS.WHAT_TAB, 'class');
    return cls.includes('active');
  }

  async clickOriginTab() {
    await this.page.click(WidgetsPage.SELECTORS.ORIGIN_TAB);
  }

  async isOriginContentVisible() {
    return await this.page.isVisible(WidgetsPage.SELECTORS.ORIGIN_CONTENT);
  }

  async navigateToDatePicker() {
    await this.navigate('/date-picker');
    await this.waitForElement(WidgetsPage.SELECTORS.DATE_INPUT);
  }

  async setDate(dateString) {
    await this.page.fill(WidgetsPage.SELECTORS.DATE_INPUT, dateString);
    await this.page.keyboard.press('Enter');
    logger.debug(`Date set to: ${dateString}`);
  }

  async getDateValue() {
    return await this.page.inputValue(WidgetsPage.SELECTORS.DATE_INPUT);
  }

  async navigateToSlider() {
    await this.navigate('/slider');
    await this.waitForElement(WidgetsPage.SELECTORS.SLIDER_INPUT);
  }

  async setSliderValue(value) {
    await this.page.fill(WidgetsPage.SELECTORS.SLIDER_INPUT, String(value));
    logger.debug(`Slider set to: ${value}`);
  }

  async getSliderValue() {
    return await this.page.inputValue(WidgetsPage.SELECTORS.SLIDER_INPUT);
  }
}

module.exports = WidgetsPage;
