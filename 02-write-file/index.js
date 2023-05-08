const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', err => {
  if (err) throw err;
});

stdin.on('data', data => {
  const input = data.toString().trim();

  if (input === 'exit') {
    exitProcess();
  } else {
    appendToFile(filePath, input);
  }
});

stdout.write('Enter your text please\n');

function appendToFile(file, data) {
  fs.appendFile(file, data, err => {
    if (err) throw err;
  });
}

function exitProcess() {
  stdout.write('Bye bye, cya later!\n');
  process.exit();
}
