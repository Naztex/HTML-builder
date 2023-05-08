const fs = require('fs');
const path = require('path');

// Путь к файлу, который будет прочитан
const filePath = path.join(__dirname, 'text.txt');

// Чтение файла
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) throw err;

  // Вывод содержимого файла в консоль
  console.log(data);
});
