const fs = require('fs');
const path = require('path');

function readJSON(filePath) {
  const resolved = path.resolve(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(resolved, 'utf-8'));
}

function readTestDataSet(dataKey) {
  const data = readJSON('data/config.json');
  return dataKey.split('.').reduce((obj, key) => obj[key], data);
}

module.exports = { readJSON, readTestDataSet };
