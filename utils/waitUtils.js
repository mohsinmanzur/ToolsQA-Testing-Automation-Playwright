const config = require('./configReader');

async function waitForSelector(page, selector, options = {}) {
  return await page.waitForSelector(selector, {
    state: 'visible',
    timeout: config.timeouts.element,
    ...options
  });
}

async function waitForURL(page, urlPattern, options = {}) {
  return await page.waitForURL(urlPattern, {
    timeout: config.timeouts.navigation,
    ...options
  });
}

async function waitForResponse(page, urlPredicate, action) {
  const [response] = await Promise.all([
    page.waitForResponse(urlPredicate),
    action()
  ]);
  return response;
}

module.exports = { waitForSelector, waitForURL, waitForResponse };
