# ToolsQA Testing Automation — Playwright

An end-to-end test automation framework for [demoqa.com](https://demoqa.com) built with **Playwright + JavaScript**, following the Page Object Model (POM) pattern with data-driven testing and Allure reporting.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation & test runner |
| JavaScript (Node.js) | Language |
| Allure | HTML test reporting |
| Winston | Logging |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                      Test Suites  (tests/)                       │
│   login   elements   forms   alerts   widgets   bookstore        │
└────────────────────────────┬─────────────────────────────────────┘
                             │ instantiate & call
┌────────────────────────────▼─────────────────────────────────────┐
│                    Page Objects  (pages/)                         │
│   LoginPage  ElementsPage  FormsPage  AlertsPage  WidgetsPage    │
│   BookStorePage   ── all extend ──▶  BasePage                    │
│   BasePage exposes: navigate()  waitForElement()                  │
│                     takeScreenshot()  handleAlert()               │
└────────────────────────────┬─────────────────────────────────────┘
                             │ use
┌────────────────────────────▼─────────────────────────────────────┐
│                     Utilities  (utils/)                           │
│   configReader.js   logger.js   screenshotUtil.js                │
│   dataParser.js     waitUtils.js                                  │
└────────────────────────────┬─────────────────────────────────────┘
                             │ read
┌────────────────────────────▼─────────────────────────────────────┐
│                    Test Data  (data/)                             │
│   config.json  — baseURL, credentials, timeouts, testData        │
└──────────────────────────────────────────────────────────────────┘

Hook & Reporter Flow
────────────────────
hooks/globalSetup.js ──▶ runs once before all suites
                         (validates config, creates report dirs)

Per-suite  beforeAll  ──▶ logs browser type & suite start
           afterAll   ──▶ logs suite completion

Per-test   beforeEach ──▶ navigates to target page
           afterEach  ──▶ captures screenshot on failure, logs result

Playwright ──▶ allure-results/ ──▶ allure generate ──▶ reports/allure-report/
```

---

## Project Structure

```
project-root/
├── tests/                  # Test spec files
│   ├── login.spec.js
│   ├── elements.spec.js
│   ├── forms.spec.js
│   ├── alerts.spec.js
│   ├── widgets.spec.js
│   └── bookstore.spec.js
├── pages/                  # Page Object Model classes
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ElementsPage.js
│   ├── FormsPage.js
│   ├── AlertsPage.js
│   ├── WidgetsPage.js
│   └── BookStorePage.js
├── utils/                  # Utility helpers
│   ├── configReader.js
│   ├── dataParser.js
│   ├── logger.js
│   ├── screenshotUtil.js
│   └── waitUtils.js
├── data/
│   └── config.json         # Test data, credentials, timeouts
├── hooks/
│   └── globalSetup.js      # Pre-suite setup (dirs, config validation)
├── reports/                # Generated reports (gitignored)
├── playwright.config.js
└── package.json
```

---

## Prerequisites

- Node.js v18+
- npm v9+
- A registered account on [demoqa.com](https://demoqa.com/register) — update `data/config.json` with your credentials

---

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/mohsinmanzur/ToolsQA-Testing-Automation-Playwright.git
cd ToolsQA-Testing-Automation-Playwright

# 2. Install dependencies
npm install

# 3. Install Playwright browser
npx playwright install chromium
```

Update `data/config.json` with your demoqa.com login credentials:

```json
"credentials": {
  "valid": {
    "username": "your_username",
    "password": "your_password"
  }
}
```

---

## Running Tests

```bash
# Run all 40 tests (headless)
npx playwright test

# Run a specific spec file
npx playwright test tests/login.spec.js
npx playwright test tests/elements.spec.js
npx playwright test tests/forms.spec.js
npx playwright test tests/alerts.spec.js
npx playwright test tests/widgets.spec.js
npx playwright test tests/bookstore.spec.js

# Run with browser visible (headed)
npx playwright test --headed

# Run in debug mode (step through)
npx playwright test --debug

# Run with Playwright's built-in HTML report
npx playwright test --reporter=html
npx playwright show-report
```

Or use the npm scripts:

```bash
npm test                 # run all tests
npm run test:login       # run login spec only
npm run test:debug       # debug mode
```

---

## Allure Report

```bash
# Step 1 — Run tests (generates allure-results/)
npx playwright test

# Step 2 — Build the HTML report
npx allure generate allure-results --clean -o reports/allure-report

# Step 3 — Open in browser
npx allure open reports/allure-report
```

Or use the npm scripts:

```bash
npm run test:report      # run tests + generate report
npm run report:open      # open the report
```

The Allure report includes:
- Test summary (pass/fail/skip counts)
- Per-test execution timeline
- Failure screenshots attached automatically
- Log output per test

---

## Test Suite — 40 Tests Total

### Login (3 tests) — `tests/login.spec.js`

| # | Test |
|---|---|
| 1 | User can login with valid credentials |
| 2 | User sees error message with invalid credentials |
| 3 | Logged-in username is displayed on profile page |

### Elements (12 tests) — `tests/elements.spec.js`

| # | Test |
|---|---|
| 1 | User can fill and submit text box form |
| 2 | Text box output reflects entered name and email |
| 3 | User can expand and select a checkbox |
| 4 | Selected checkbox result text is displayed |
| 5 | User can select the Yes radio button |
| 6 | No radio button is disabled |
| 7 | User can add a new row to the web table |
| 8 | User can search and filter web table rows |
| 9 | User can delete a row from the web table |
| 10 | Double click button shows correct message |
| 11 | Right click button shows correct message |
| 12 | Single click button shows correct message |

### Forms (5 tests) — `tests/forms.spec.js`

| # | Test |
|---|---|
| 1 | User can fill all required fields and submit the practice form |
| 2 | Form submission modal shows entered first and last name |
| 3 | Form submission modal shows entered email |
| 4 | Form submission modal shows selected gender |
| 5 | Form submission modal shows entered mobile number |

### Alerts, Frame & Windows (8 tests) — `tests/alerts.spec.js`

| # | Test |
|---|---|
| 1 | Simple alert appears and can be accepted |
| 2 | Alert with timer appears after delay |
| 3 | Confirm alert accepted shows Ok response |
| 4 | Confirm alert dismissed shows Cancel response |
| 5 | Prompt alert accepts typed text and shows it |
| 6 | New Tab button opens a new browser tab |
| 7 | New Window button opens a new browser window |
| 8 | Small modal dialog can be opened and closed |

### Widgets (6 tests) — `tests/widgets.spec.js`

| # | Test |
|---|---|
| 1 | First accordion section is open by default |
| 2 | User can open the second accordion section |
| 3 | What tab is active by default |
| 4 | User can switch to the Origin tab |
| 5 | User can select a date from the date picker |
| 6 | User can move the slider to a specific value |

### Book Store (6 tests) — `tests/bookstore.spec.js`

| # | Test |
|---|---|
| 1 | Book store page loads and displays books |
| 2 | User can search for a book by title |
| 3 | Search returns matching book titles only |
| 4 | Clicking a book opens its detail page |
| 5 | Book detail page shows ISBN field |
| 6 | Logged-in user can navigate to their profile |

---

## Configuration

All environment values live in `data/config.json` — never hardcoded in test files:

| Key | Description |
|---|---|
| `baseURL` | Target site URL |
| `credentials.valid` | Valid login credentials |
| `credentials.invalid` | Invalid credentials for negative tests |
| `timeouts.default` | Per-test timeout (ms) |
| `timeouts.element` | Element wait timeout (ms) |
| `timeouts.navigation` | Page navigation timeout (ms) |
| `screenshotDir` | Where failure screenshots are saved |
| `testData` | Form inputs, table data, search terms |

---

## Logs

Test run logs are written to `reports/logs/test-run.log` at debug level and to the console at info level.

---

## Author

Mohsin Manzoor
