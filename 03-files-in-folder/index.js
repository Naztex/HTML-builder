const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'secret-folder');

fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      const { name, ext } = path.parse(file.name);
      const formattedName = name.replace('.', '');
      const filePath = path.join(directoryPath, file.name);

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        const fileSizeInBytes = stats.size;
        const fileSizeInKB = fileSizeInBytes / 1024;
        console.log(`${formattedName} - ${ext.replace('.', '')} - ${fileSizeInKB.toFixed(2)}kb`);
      });
    }
  });
});
