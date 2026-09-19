const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const uploadsDir1 = path.join(rootDir, 'uploads');
const uploadsDir2 = path.resolve('C:/Users/bansa/Downloads/uploads');

// 1. Locate the CSS file in dist/assets
const assetsDir = path.join(distDir, 'assets');
const assetFiles = fs.readdirSync(assetsDir);
const cssFile = assetFiles.find(f => f.endsWith('.css'));

if (!cssFile) {
  console.error('No CSS file found in dist/assets!');
  process.exit(1);
}

const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
console.log(`Found CSS file: ${cssFile} (${cssContent.length} bytes)`);

// 2. Read dist/index.html
const indexPath = path.join(distDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace the <link rel="stylesheet" crossorigin href="/assets/...">
// with inlined <style> + non-crossorigin links
const inlinedStyleBlock = `
    <!-- Inlined CSS for 100% Reliable Rendering -->
    <style id="pujya-core-styles">
${cssContent}
    </style>
    <link rel="stylesheet" href="./assets/${cssFile}">
    <link rel="stylesheet" href="/assets/${cssFile}">
`;

indexHtml = indexHtml.replace(/<link\s+rel="stylesheet"[^>]*>/i, inlinedStyleBlock);

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Successfully embedded CSS into dist/index.html!');

// 3. Copy dist to both uploads directories
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

console.log('Copying to uploads folders...');
copyRecursive(distDir, uploadsDir1);
copyRecursive(distDir, uploadsDir2);

console.log('Done preparing final distribution!');
