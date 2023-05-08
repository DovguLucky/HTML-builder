const fs = require('fs');
const path = require('node:path');

const linkNewFile = path.join('05-merge-styles', 'project-dist', 'bundle.css');
const linkOldFiles = path.join('05-merge-styles', 'styles');

function deleteFile() {
  fs.unlink(linkNewFile, (err1) => {
    if (err1) {
      return err1;
    }
    return null;
  });
}

function fileHandler(text) {
  fs.appendFile(linkNewFile, `${text}\n`, (err2) => {
    if (err2) throw err2;
    return null;
  });
}

function addTextInFile() {
  fs.writeFile(linkNewFile, '', (err3) => {
    if (err3) {
      return err3;
    }
    return null;
  });

  fs.readdir(linkOldFiles, (err4, files) => {
    if (err4) {
      return err4;
    }
    files.forEach((file) => {
      const link = path.join(linkOldFiles, file);
      fs.stat(link, (err5, stats) => {
        if (err5) {
          return err5;
        }
        if (stats.isFile() && path.extname(file) === '.css') {
          fs.readFile(link, 'utf8', (err6, data) => {
            if (err6) throw err6;
            fileHandler(data);
          });
        }
        return null;
      });
    });
    return null;
  });
}

fs.access(linkNewFile, (err7) => {
  if (err7) {
    addTextInFile();
  } else {
    deleteFile();
    addTextInFile();
  }
  return null;
});

// node ./05-merge-styles/index.js
// npx eslint ./ --ext .js,.jsx --fix
