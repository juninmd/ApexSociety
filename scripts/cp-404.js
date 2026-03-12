const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../dist/index.html');
const dest = path.join(__dirname, '../dist/404.html');

if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Copied index.html to 404.html for SPA routing on GitHub Pages.');
} else {
    console.error('Error: dist/index.html not found. Build failed?');
    process.exit(1);
}
