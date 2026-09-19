import fs from 'fs';
import path from 'path';

const projectRoot = 'c:/Users/bansa/Downloads/pujya-agritech WEB';
const publicDir = path.join(projectRoot, 'public');

function checkFileExists(relPath) {
  if (relPath.startsWith('/')) relPath = relPath.slice(1);
  relPath = relPath.split('#')[0].split('?')[0];
  const fullPath = path.join(publicDir, relPath);
  const exists = fs.existsSync(fullPath);
  return { relPath, fullPath, exists };
}

function scanFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json') || file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const srcFiles = scanFiles(path.join(projectRoot, 'src')).concat(path.join(projectRoot, 'index.html'));

const missing = new Set();
const found = new Set();

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  // Match any quoted asset path starting with '/'
  const matches = content.matchAll(/['"](\/[^'"\>\<\)]+?\.(?:png|jpg|jpeg|webp|mp4|ico|svg|jfif|xml|webmanifest|pdf))['"]/gi);
  for (const m of matches) {
    // In case string contains multiple lines or entities
    const rawPaths = m[1].replace(/&#10;/g, '\n').split('\n');
    for (let rawPath of rawPaths) {
      rawPath = rawPath.trim();
      if (!rawPath.startsWith('/')) continue;
      const { exists } = checkFileExists(rawPath);
      if (!exists) {
        missing.add(`${rawPath} (referenced in ${path.relative(projectRoot, file)})`);
      } else {
        found.add(rawPath);
      }
    }
  }
}

console.log(`--- ASSET CHECK RESULTS ---`);
console.log(`Found valid assets: ${found.size}`);
console.log(`Missing assets count: ${missing.size}`);
if (missing.size > 0) {
  console.log(`Missing assets list:`);
  missing.forEach((item) => console.log(`  - ${item}`));
} else {
  console.log(`All referenced assets exist in public/! (Zero missing assets)`);
}
