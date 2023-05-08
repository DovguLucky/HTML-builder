const fs = require('fs');
const path = require('node:path');
const {
  stdout,
} = require('process');

const link = path.join('03-files-in-folder', 'secret-folder');

fs.readdir(link, (err, files) => {
  if (err) {
    return err;
  }
  files.forEach((file) => {
    const link2 = path.join(link, file);
    fs.stat(link2, (err1, stats) => {
      if (err1) {
        return err1;
      }
      if (stats.isFile()) {
        const res = `${path.basename(file).split('.')[0]} - ${
          path.extname(file).split('').filter((el) => el !== '.').join('')} - ${
          stats.size / 1024}kb`;
        stdout.write(`${res}\n`);
        return null;
      }
      return null;
    });
  });
  return null;
});

//   node ./03-files-in-folder/index.js
//   npx eslint ./ --ext .js,.jsx --fix
