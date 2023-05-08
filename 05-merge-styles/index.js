const fs = require('fs');
const path = require('path');

// Асинхронная функция для копирования CSS-файлов
async function copyCSSFiles() {
  try {
    // Указываем исходную директорию с CSS-файлами
    const sourceDirectory = path.join(__dirname, 'styles');

    // Указываем путь и имя целевого файла, в который будут скопированы стили
    const targetFile = path.join(__dirname, 'project-dist', 'bundle.css');

    // Получаем список файлов в исходной директории
    const files = await fs.promises.readdir(sourceDirectory, { withFileTypes: true });

    // Создаем пустой целевой файл
    await fs.promises.writeFile(targetFile, '');

    // Перебираем файлы в исходной директории
    for (const file of files) {
      // Проверяем, является ли файл CSS-файлом
      if (file.isFile() && path.parse(file.name).ext === '.css') {
        // Формируем путь к исходному файлу
        const sourceFile = path.join(sourceDirectory, file.name);

        // Читаем содержимое CSS-файла
        const data = await fs.promises.readFile(sourceFile, 'utf-8');

        // Добавляем содержимое CSS-файла в целевой файл
        await fs.promises.appendFile(targetFile, data);
      }
    }

    console.log('CSS files copied successfully!');
  } catch (err) {
    throw(err);
  }
}

// Вызываем функцию для копирования CSS-файлов
copyCSSFiles();
