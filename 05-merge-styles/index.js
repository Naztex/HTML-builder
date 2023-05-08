const fs = require('fs');
const path = require('path');

async function copyCSSFiles() {
  try {
    const sourceDirectory = path.join(__dirname, 'styles');
    const targetFile = path.join(__dirname, 'project-dist', 'bundle.css');

    const files = await fs.promises.readdir(sourceDirectory, { withFileTypes: true });
    await fs.promises.writeFile(targetFile, '');

    for (const file of files) {
      if (file.isFile() && path.parse(file.name).ext === '.css') {
        const sourceFile = path.join(sourceDirectory, file.name);
        const data = await fs.promises.readFile(sourceFile, 'utf-8');
        await fs.promises.appendFile(targetFile, data);
      }
    }

    console.log('CSS files copied successfully!');
  } catch (err) {
    throw(err);
  }
}

copyCSSFiles();
