# CLAUDE.md — Playwright JS Automation Framework

## Project Overview
A Playwright + JavaScript automation testing framework following industry best practices.  
The goal of this project is to automate the testing for https://demoqa.com/.

---

## Architecture

```
project-root/
├── tests/                  # Test suites & test cases
├── pages/                  # Page Object Model classes (one file per page)
├── utils/                  # Utilities layer
│   ├── logger.js
│   ├── configReader.js
│   ├── screenshotUtil.js
│   ├── dataParser.js       # JSON/XML data handling
│   └── waitUtils.js
├── data/                   # Test data files (JSON or XML)
├── hooks/                  # Global setup/teardown
│   └── globalSetup.js
├── reports/                # Generated reports (Allure or Extent)
├── playwright.config.js
└── README.md
```

---

## Design Patterns & Conventions

### Page Object Model (POM)
- One class per page (e.g., `LoginPage`, `HomePage`, `CheckoutPage`)
- Each class encapsulates locators and actions for that page only
- No assertions inside page classes — keep them in test files

### Data-Driven Testing
- Test data stored in `data/` as JSON files (preferred) or XML
- `utils/dataParser.js` handles all read operations
- Tests import data dynamically — no hardcoded values in test scripts

### Modular Methods (must exist in utils or base class)
- `login(username, password)` / `logout()`
- `navigate(url)`
- `waitForElement(locator, timeout)`
- `takeScreenshot(name)`
- `handleAlert(action)` — accept/dismiss

---

## Hooks Pattern

Use Playwright's built-in hooks in every test file:

```js
test.beforeAll(async ({ browser }) => { /* browser setup */ });
test.afterAll(async () => { /* browser close, report finalize */ });
test.beforeEach(async ({ page }) => { /* test init, navigate */ });
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') await screenshotUtil.capture(page, testInfo.title);
});
```

---

## Reporting
- Use **Allure** (preferred) or Extent Reports
- Report must include: test summary, pass/fail results, failure screenshots, execution time, logs
- Reports generated to `reports/` — never commit generated reports to git

---

## Code Quality Rules
- Use `async/await` consistently — no `.then()` chains
- Use explicit waits only (`waitForSelector`, `waitForURL`) — no `page.waitForTimeout()` (flaky)
- Meaningful test and function names: `test('User can login with valid credentials', ...)`
- One assertion concept per test where possible
- All locators defined as constants at the top of each Page class

---

## Configuration
- `playwright.config.js` holds: baseURL, browser, timeout, reporter, screenshot-on-failure settings
- Environment-specific values (credentials, URLs) go in `data/config.json`, read via `utils/configReader.js`
- Never hardcode URLs, credentials, or timeouts in test files

---

## Deliverables Checklist
- [ ] Source code (JS classes, test scripts, config files, data files)
- [ ] Architecture diagram (can be in README or separate doc)
- [ ] `README.md` with setup and execution steps
- [ ] Generated test report
- [ ] (Optional) Brief presentation

---

## Commands

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run with Allure report
npx playwright test && allure generate allure-results --clean -o reports/allure-report

# Open report
allure open reports/allure-report

# Run specific test file
npx playwright test tests/login.spec.js

# Debug mode
npx playwright test --debug
```

---

## Instructions

- Every time I say, commit the code to the following repo: https://github.com/mohsinmanzur/ToolsQA-Testing-Automation-Playwright
- Create a gitignore with appropriate file names configured along with the CLAUDE.md file.

---

## What NOT to Do
- Don't write assertions in Page Object classes
- Don't use `page.waitForTimeout()` — use explicit conditions
- Don't hardcode test data in test files
- Don't commit `node_modules/`, `reports/`, or `.env` files
- Don't exceed 40 test cases total
- Don't leave comments where not necessary