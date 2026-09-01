import fs from 'fs';
import path from 'path';

const projectRoot = 'c:/Users/bansa/Downloads/pujya-agritech WEB';
const publicDir = path.join(projectRoot, 'public');

function checkFileExists(relPath) {
  // Normalize path
  if (relPath.startsWith('/')) relPath = relPath.slice(1);
  // remove hash or query if any
  relPath = relPath.split('#')[0].split('?')[0];
  const fullPath = path.join(publicDir, relPath);
  const exists = fs.existsSync(fullPath);
  return { relPath, fullPath, exists };
}

// Find all string literals starting with '/' in src/
function scanFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const srcFiles = scanFiles(path.join(projectRoot, 'src'));
const assetRegex = /['"](\/(?:projects|products|gallery|certificates|workflow|assets|images|[\w\-]+?\.(?:png|jpg|jpeg|webp|mp4|ico|svg|jfif)))['"]/g;

const missing = new Set();
const found = new Set();

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  // Also simple regex for any '/...' asset reference
  const matches = content.matchAll(/['"](\/[^'"\s\)\>]+?\.(?:png|jpg|jpeg|webp|mp4|ico|svg|jfif|xml|txt))['"]/gi);
  for (const m of matches) {
    const urlPath = m[1];
    const { exists } = checkFileExists(urlPath);
    if (!exists) {
      missing.add(`${urlPath} (referenced in ${path.relative(projectRoot, file)})`);
    } else {
      found.add(urlPath);
    }
  }
}

console.log(`--- ASSET CHECK RESULTS ---`);
console.log(`Found valid assets: ${found.size}`);
console.log(`Missing assets count: ${missing.size}`);
if (missing.size > 0) {
  console.log(`Missing assets list:`);
  missing.forEach((item) => console.log(`  - ${item}`));
}
