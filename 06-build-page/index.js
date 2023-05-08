const fs = require('fs');
const path = require('path');

// Создание необходимых директорий
async function createDirectories() {
  try {
    await fs.promises.mkdir(path.join(__dirname, "project-dist"), { recursive: true });
    await fs.promises.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true });
  } catch (err) {
    throw err;
  }
}

// Копирование файлов стилей в один общий файл
async function copyStyles() {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
    // Создание пустого файла стилей
    await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '');

    for (const file of files) {
      if (file.isFile() && path.parse(file.name).ext === '.css') {
        const sourceFile = path.join(__dirname, 'styles', file.name);
        const data = await fs.promises.readFile(sourceFile, 'utf-8');
        // Добавление содержимого каждого файла стилей в общий файл
        await fs.promises.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data);
      }
    }
  } catch (err) {
    throw err;
  }
}

// Копирование файлов из директории assets
async function copyAssets() {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, 'assets'), { withFileTypes: true });

    for (const file of files) {
      if (!file.isFile()) {
        // Создание поддиректорий в директории assets
        await fs.promises.mkdir(path.join(__dirname, "project-dist", "assets", file.name), { recursive: true });
        await copyFile(file.name);
      }
    }
  } catch (err) {
    throw err;
  }
}

// Копирование файлов в поддиректориях директории assets
async function copyFile(dirname) {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, 'assets', dirname), { withFileTypes: true });

    for (const file of files) {
      // Копирование каждого файла в соответствующую поддиректорию внутри директории assets
      await fs.promises.copyFile(
        path.join(__dirname, 'assets', dirname, file.name),
        path.join(__dirname, 'project-dist', "assets", dirname, file.name)
      );
    }
  } catch (err) {
    throw err;
  }
}

// Генерация HTML-файла на основе шаблона и компонентов
async function generateHTML() {
  try {
    const template = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
    let htmlText = template;

    const components = await fs.promises.readdir(path.join(__dirname, 'components'), { withFileTypes: true });

    for (const component of components) {
      const componentInner = await fs.promises.readFile(path.join(__dirname, 'components', component.name), 'utf-8');
      const componentFileName = component.name.split('.')[0];
      // Замена меток компонентов в HTML-шаблоне на соответствующее содержимое компонентов
      htmlText = htmlText.replace(`{{${componentFileName}}}`, componentInner);
    }
    // Добавление сгенерированного HTML-кода в index.html
    await fs.promises.appendFile(path.join(__dirname, 'project-dist', 'index.html'), htmlText);
  } catch (err) {
    throw err;
  }
}

// Копирование всей директории
async function copyDirectory() {
  try {
    await createDirectories();// Создание необходимых директорий
    await copyStyles();// Копирование файлов стилей
    await copyAssets();// Копирование файлов из директории assets
    await generateHTML();// Генерация HTML-файла

    console.log('Directory copied successfully!');
  } catch (err) {
    throw err;
  }
}

copyDirectory();
