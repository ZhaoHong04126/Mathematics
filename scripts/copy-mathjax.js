import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '..', 'node_modules', 'mathjax', 'es5');
const destDir = path.join(__dirname, '..', 'public', 'mathjax');

if (fs.existsSync(srcDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('Successfully copied MathJax to public/mathjax');
} else {
  console.warn('MathJax node_modules folder not found');
}
