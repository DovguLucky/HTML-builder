const fs = require('fs');
const path = require('node:path');

const linkNew = path.join('06-build-page', 'project-dist');
const linkAssets = path.join('06-build-page', 'assets');
const linkOldHTML = path.join('06-build-page', 'template.html');
const linkNewHTML = path.join('06-build-page', 'project-dist', 'index.html');
const linkQWER = path.join('06-build-page', 'project-dist', 'assets');
const fileOldCSS = path.join('06-build-page', 'styles');
const fileNewCSS = path.join('06-build-page', 'project-dist', 'style.css');

//  editing HTML-file
function makeHTML() {
  fs.readFile(linkNewHTML, 'utf8', (err9, data) => {
    const findWords = data.match(/{{\w+}}/gi);
    if (err9) {
      return err9;
    }
    if (data) {
      let newData = '';
      if (findWords === null) {
        return null;
      }
      if (findWords.length !== 0) {
        const findWord = (findWords[0].match(/\w+/gi)).join('');
        const linkAddPart = path.join('06-build-page', 'components', (`${findWord}.html`));
        fs.readFile(linkAddPart, 'utf8', (err10, d) => {
          if (err10) {
            return err10;
          }
          newData = data.replace(findWords[0], d);
          fs.writeFile(linkNewHTML, newData, (err11) => {
            if (err11) throw err11;
            makeHTML();
            return null;
          });
          return null;
        });
      }
    }
    return null;
  });
  return null;
}

//  Copy HTML-file
function copyHTML() {
  fs.copyFile(linkOldHTML, linkNewHTML, (err12) => {
    if (err12) throw err12;
    makeHTML();
    return null;
  });
}

// Add CSS file
function fileHandler(text) {
  fs.appendFile(fileNewCSS, `${text}\n`, (err13) => {
    if (err13) throw err13;
    return null;
  });
}

// Add all content in one file (CSS)
function addTextInFile() {
  fs.writeFile(fileNewCSS, '', (err14) => {
    if (err14) throw err14;
  });

  fs.readdir(fileOldCSS, (err15, files) => {
    if (err15) {
      return err15;
    }
    files.forEach((file) => {
      const link = path.join(fileOldCSS, file);
      fs.stat(link, (err16, stats) => {
        if (err16) {
          return err16;
        }
        if (stats.isFile() && path.extname(file) === '.css') {
          fs.readFile(link, 'utf8', (err17, data) => {
            if (err17) throw err17;
            fileHandler(data);
          });
        }
        return null;
      });
    });
    return null;
  });
}

// Function for copy DIR
function copyDir(link, subLink) {
  fs.stat(link, (err4, stats) => {
    if (stats.isDirectory()) {
      fs.readdir(link, (err3, files) => {
        if (err3) {
          return err3;
        }
        files.forEach((fil) => {
          const q = path.join(link, fil);
          const linkSubSub = path.join(subLink, fil);
          fs.stat(q, (err5, st) => {
            if (st.isDirectory()) {
              fs.mkdir(linkSubSub, (err6) => err6);
              copyDir(q, linkSubSub);
            }
            if (st.isFile()) {
              fs.copyFile(q, linkSubSub, () => null);
            }
          });
        });
        return null;
      });
    }
    return null;
  });
}

// Add new DIR "project-dist" && "assets"
function startDir() {
  // Add new DIR "project-dist"
  fs.mkdir(linkNew, (err1) => {
    if (err1) {
      return err1;
    }
    copyHTML();
    addTextInFile();

    // ADD new directory "assets"
    fs.mkdir(path.join(linkNew, 'assets'), (err2) => {
      if (err2) {
        return err2;
      }
      copyDir(linkAssets, linkQWER);
      return null;
    });
    return null;
  });
}

// Reset All Files
let doq = 1;
function resetFile() {
  fs.stat(linkNew, (err24) => {
    if (err24) {
      startDir();
      return null;
    }
    fs.readdir(linkNew, (err25, files1) => {
      if (files1 == null) {
        return null;
      }
      doq = files1.length;
      if (doq === 0) {
        fs.rmdir(linkNew, () => {
          startDir();
          return null;
        });
        return null;
      }

      function delDir(link) {
        fs.stat(link, () => {
          fs.readdir(link, (err19, files) => {
            if (files == null) {
              return null;
            }
            if (files.length === 0) {
              return null;
            }
            files.forEach((fil) => {
              const q = path.join(link, fil);
              fs.stat(q, (err20, st) => {
                if (st == null) {
                  return null;
                }
                if (st.isDirectory()) {
                  fs.readdir(q, (err21, f) => {
                    if (f == null) {
                      return;
                    }
                    if (f.length === 0) {
                      fs.rmdir(q, () => {});
                    } else {
                      delDir(q);
                      fs.rmdir(q, () => {});
                    }
                  });
                } else if (st.isFile()) {
                  fs.unlink(q, () => {});
                }
                return null;
              });
            });
            return null;
          });
          return null;
        });
        resetFile();
        return null;
      }
      delDir(linkNew);
      return null;
    });
    return null;
  });
}

resetFile();

// node ./06-build-page/index.js
// npx eslint ./ --ext .js,.jsx --fix
