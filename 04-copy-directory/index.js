const fs = require('fs');
const path = require('node:path');

const link = path.join('04-copy-directory', 'files');
const linkCopy = path.join('04-copy-directory', 'files-copy');

function copyDir() {
  function deleteOldFile() {
    fs.readdir(linkCopy, (err, files) => {
      if (err) {
        return err;
      }
      files.forEach((file) => {
        const linkCopyDel = path.join(linkCopy, file);
        fs.unlink(linkCopyDel, (err1) => {
          if (err1) {
            return err1;
          }
          return null;
        });
      });
      return null;
    });
  }

  function addNewFile() {
    fs.mkdir(linkCopy, {
      recursive: true,
    }, (err2) => {
      if (err2) {
        return err2;
      }
      return null;
    });

    fs.readdir(link, (err3, files) => {
      if (err3) {
        return err3;
      }
      files.forEach((file) => {
        fs.copyFile(`${link}/${file}`, `${linkCopy}/${file}`, (err4) => {
          if (err4) {
            return err4;
          }
          return null;
        });
        return null;
      });

      return null;
    });
  }

  fs.access(linkCopy, (error) => {
    if (error) {
      addNewFile();
    } else {
      deleteOldFile();
      addNewFile();
    }
  });
}

copyDir();

// node ./04-copy-directory/index.js
// npx eslint ./ --ext .js,.jsx --fix
