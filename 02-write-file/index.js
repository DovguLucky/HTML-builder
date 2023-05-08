const fs = require('fs');
const path = require('node:path');
const readline = require('node:readline');

const link = path.join('02-write-file', 'text.txt');

const {
  stdin: input,
  stdout: output,
} = require('node:process');
const { stdout } = require('process');

const rl = readline.createInterface({
  input,
  output,
});

function deleteTextFile() {
  fs.unlink(link, (err1) => {
    if (err1) {
      return err1;
    }
    return null;
  });
  stdout.write("\n'Good Luck!'");
  rl.pause();
  return null;
}

rl.on('close', () => {
  deleteTextFile();
});

function around() {
  rl.question('Введите текст (для выхода используйте  ctrl + C или "exit"):\n', (answer) => {
    if (answer === 'exit') {
      return deleteTextFile();
    }

    function addNewText(inside) {
      fs.writeFile(link, inside, (err2) => {
        if (err2) {
          return err2;
        }
        return null;
      });
    }

    fs.readFile(link, 'utf8', (error, data) => {
      if (error) throw error;
      const insideText = `${data}${answer}`;
      addNewText(insideText);
    });

    rl.on('line', (ins) => {
      if (ins === 'exit') {
        return deleteTextFile();
      }
      fs.readFile(link, 'utf8', (error, data) => {
        if (error) throw error;
        const insideText = `${data}${ins}`;
        addNewText(insideText);
      });
      return null;
    });
    return null;
  });
  return null;
}

fs.writeFile(link, '', (err3) => {
  if (err3) {
    return err3;
  }
  return around();
});

// node ./02-write-file/index.js
// npx eslint ./ --ext .js,.jsx --fix
