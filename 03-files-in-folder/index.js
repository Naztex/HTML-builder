const fs = require('fs');
const path = require('path');

// Указываем путь к директории, содержащей файлы
const directoryPath = path.join(__dirname, 'secret-folder');

// Читаем содержимое директории
fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  // Перебираем файлы в директории
  files.forEach(file => {
    if (file.isFile()) {
      // Получаем имя файла и его расширение
      const { name, ext } = path.parse(file.name);

      // Форматируем имя файла, удаляя точку из названия (если есть)
      const formattedName = name.replace('.', '');

      // Формируем полный путь к файлу
      const filePath = path.join(directoryPath, file.name);

      // Получаем информацию о файле (размер и прочие свойства)
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        // Вычисляем размер файла в килобайтах
        const fileSizeInBytes = stats.size;
        const fileSizeInKB = fileSizeInBytes / 1024;

        // Выводим информацию о файле в консоль
        console.log(`${formattedName} - ${ext.replace('.', '')} - ${fileSizeInKB.toFixed(2)}kb`);
      });
    }
  });
});
