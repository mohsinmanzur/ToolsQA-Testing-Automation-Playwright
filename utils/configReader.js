const fs = require('fs');
const path = require('path');

const config = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/config.json'), 'utf-8')
);

module.exports = Object.freeze(config);
