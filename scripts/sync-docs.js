#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const libRoot = path.join(repoRoot, 'lib');

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch (e) {
    return false;
  }
}

async function copyFile(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
  console.log('copied', src, '->', dest);
}

async function copyDir(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const ent of entries) {
    const srcPath = path.join(srcDir, ent.name);
    const destPath = path.join(destDir, ent.name);
    if (ent.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (ent.isFile()) {
      await copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  const candidates = [
    'README.md',
    'README.MD',
    'docs',
    'documentation',
  ];

  let found = false;
  for (const name of candidates) {
    const srcPath = path.join(libRoot, name);
    if (!(await exists(srcPath))) continue;
    found = true;
    const destPath = path.join(repoRoot, name);
    const stat = await fs.stat(srcPath);
    if (stat.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (stat.isFile()) {
      await copyFile(srcPath, destPath);
    }
  }

  // Also copy any top-level .md files inside lib (extra docs)
  const libEntries = await fs.readdir(libRoot, { withFileTypes: true });
  for (const ent of libEntries) {
    if (!ent.isFile()) continue;
    if (/\.md$/i.test(ent.name) && !(await exists(path.join(repoRoot, ent.name)))) {
      found = true;
      await copyFile(path.join(libRoot, ent.name), path.join(repoRoot, ent.name));
    }
  }

  if (!found) {
    console.log('No docs found under lib/ to copy.');
    process.exit(1);
  }
  console.log('Docs sync complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
