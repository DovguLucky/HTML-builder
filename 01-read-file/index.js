const fs = require('fs');
const path = require('node:path');
const { Readable } = require('stream');

const rs = new Readable();
const link = path.join('01-read-file', 'text.txt');
const text = new fs.ReadStream(link);

text.on('readable', () => {
  const data = text.read();
  if (data !== null) {
    if (data !== null) {
      rs.push(data.toString());
    }
  }
});

// node ./01-read-file/index.js
