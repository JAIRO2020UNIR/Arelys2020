const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
  const filePath = path.join(__dirname, '../data', fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeData = (fileName, data) => {
  const filePath = path.join(__dirname, '../data', fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = { readData, writeData };
