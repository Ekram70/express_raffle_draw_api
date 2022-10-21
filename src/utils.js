const fs = require('fs/promises');
const path = require('path');
const dbPath = path.resolve('data', 'db.json');

const readFile = async () => {
  const data = await fs.readFile(dbPath);
  return JSON.parse(data);
};

const writeFile = async (data) => {
  await fs.writeFile(dbPath, JSON.stringify(data));
};

module.exports = {
  readFile,
  writeFile,
};
