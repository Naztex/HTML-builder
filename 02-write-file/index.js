const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

// Путь к файлу, в который будут записываться данные
const filePath = path.join(__dirname, 'text.txt');

// Создаем пустой файл перед началом работы
fs.writeFile(filePath, '', err => {
  if (err) throw err;
});

// Слушаем ввод данных с консоли
stdin.on('data', data => {
  const input = data.toString().trim();

  // Если введено 'exit', завершаем программу
  if (input === 'exit') {
    exitProcess();
  } else {
    // Добавляем введенные данные в файл
    appendToFile(filePath, input);
  }
});

// Пишем приветственное сообщение
stdout.write('Enter your text please\n');

// Функция для добавления данных в файл
function appendToFile(file, data) {
  fs.appendFile(file, data, err => {
    if (err) throw err;
  });
}

// Функция для завершения программы
function exitProcess() {
  stdout.write('Bye bye, cya later!\n');
  process.exit();
}
