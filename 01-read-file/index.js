const fs = require('fs');
const path = require('node:path');
const {
  stdout,
} = require('process');

const link = path.join('01-read-file', 'text.txt');
const text = new fs.ReadStream(link, {
  encoding: 'utf8',
});

text.on('readable', () => {
  const data = text.read();
  if (data !== null) {
    stdout.write(data);
  }
});

// node ./01-read-file/index.js
