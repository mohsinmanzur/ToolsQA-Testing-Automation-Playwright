const fs = require('fs');
const path = require('path');
const config = require('./configReader');
const logger = require('./logger');

async function capture(page, testTitle) {
  const sanitized = testTitle.replace(/[^a-z0-9]/gi, '_').substring(0, 100);
  const timestamp = Date.now();
  const filename = `${sanitized}_${timestamp}.png`;
  const dir = path.resolve(process.cwd(), config.screenshotDir);

  fs.mkdirSync(dir, { recursive: true });

  const fullPath = path.join(dir, filename);
  await page.screenshot({ path: fullPath, fullPage: true });
  logger.info(`Screenshot saved: ${fullPath}`);
  return fullPath;
}

module.exports = { capture };
