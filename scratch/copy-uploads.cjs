const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'dist');
const destDir1 = path.resolve(__dirname, '..', 'uploads');
const destDir2 = path.resolve('C:/Users/bansa/Downloads/uploads');

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying from dist to uploads...');
copyRecursive(srcDir, destDir1);
copyRecursive(srcDir, destDir2);

console.log('Finished copying successfully!');
console.log('Files in uploads:', fs.readdirSync(destDir1));
