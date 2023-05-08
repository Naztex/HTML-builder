const fs = require('fs');
const path = require('path');

const sourceDirectory = path.join(__dirname, 'files');
const targetDirectory = path.join(__dirname, 'files-copy');

async function copyFile(sourceFile, targetFile) {
  const readStream = fs.createReadStream(sourceFile);
  const writeStream = fs.createWriteStream(targetFile);
  readStream.pipe(writeStream);
}

async function copyFiles() {
  try {
    await fs.promises.mkdir(targetDirectory, { recursive: true });

    const files = await fs.promises.readdir(sourceDirectory, { withFileTypes: true });
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

async function updateFiles() {
  try {
    const sourceFiles = await fs.promises.readdir(sourceDirectory);
    const targetFiles = await fs.promises.readdir(targetDirectory);

    for (const targetFile of targetFiles) {
      if (!sourceFiles.includes(targetFile)) {
        const fileToDelete = path.join(targetDirectory, targetFile);
        await fs.promises.unlink(fileToDelete);
      }
    }
  } catch (err) {
    throw err;
  }
}

async function start() {
  await copyFiles();
  await updateFiles();
}

start();

