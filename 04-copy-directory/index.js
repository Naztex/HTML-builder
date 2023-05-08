const fs = require('fs');
const path = require('path');

// Указываем пути к исходной и целевой директориям
const sourceDirectory = path.join(__dirname, 'files');
const targetDirectory = path.join(__dirname, 'files-copy');

// Функция для копирования файла
async function copyFile(sourceFile, targetFile) {
  // Создаем поток чтения из исходного файла
  const readStream = fs.createReadStream(sourceFile);

  // Создаем поток записи в целевой файл
  const writeStream = fs.createWriteStream(targetFile);

  // Перенаправляем данные из потока чтения в поток записи
  readStream.pipe(writeStream);
}

// Функция для копирования файлов из исходной директории в целевую директорию
async function copyFiles() {
  try {
    // Создаем целевую директорию (если она не существует)
    await fs.promises.mkdir(targetDirectory, { recursive: true });

    // Получаем список файлов в исходной директории
    const files = await fs.promises.readdir(sourceDirectory, { withFileTypes: true });

    // Перебираем файлы в исходной директории
    for (const file of files) {
      if (file.isFile()) {
        const sourceFile = path.join(sourceDirectory, file.name);
        const targetFile = path.join(targetDirectory, file.name);
        await copyFile(sourceFile, targetFile);
      }
    }

    console.log('Initial files copied successfully!');
  } catch (err) {
    throw err;
  }
}

// Функция для обновления файлов в целевой директории
async function updateFiles() {
  try {
    // Получаем список файлов в исходной и целевой директориях
    const sourceFiles = await fs.promises.readdir(sourceDirectory);
    const targetFiles = await fs.promises.readdir(targetDirectory);

    // Перебираем файлы в целевой директории
    for (const targetFile of targetFiles) {
      // Если файл не существует в исходной директории, удаляем его из целевой директории
      if (!sourceFiles.includes(targetFile)) {
        const fileToDelete = path.join(targetDirectory, targetFile);
        await fs.promises.unlink(fileToDelete);
      }
    }
  } catch (err) {
    throw err;
  }
}

// Основная функция, запускающая процесс копирования и обновления файлов
async function start() {
  await copyFiles();   // Копируем исходные файлы в целевую директорию
  await updateFiles(); // Обновляем файлы в целевой директории
}

start();