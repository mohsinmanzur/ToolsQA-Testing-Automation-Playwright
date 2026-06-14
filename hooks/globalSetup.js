const fs = require('fs');
const path = require('path');
const config = require('../utils/configReader');
const logger = require('../utils/logger');

module.exports = async function globalSetup() {
  logger.info('=== Global Setup: Starting test suite ===');
  logger.info(`Target: ${config.baseURL}`);
  logger.info(`Date: ${new Date().toISOString()}`);

  if (!config.baseURL || !config.credentials?.valid?.username) {
    throw new Error('Invalid config: baseURL and credentials.valid must be defined in data/config.json');
  }

  const dirs = [
    path.resolve(process.cwd(), 'reports'),
    path.resolve(process.cwd(), 'reports/screenshots'),
    path.resolve(process.cwd(), 'reports/logs')
  ];
  dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

  logger.info('Global setup complete. Report directories ready.');
};
