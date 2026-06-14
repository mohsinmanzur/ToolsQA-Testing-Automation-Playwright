const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = path.resolve(__dirname, '../reports/logs');
fs.mkdirSync(logDir, { recursive: true });

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.File({ filename: path.join(logDir, 'test-run.log'), level: 'debug' })
  ]
});

module.exports = logger;
