const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, '../src/constants/metadata.json');
const htmlPath = path.join(__dirname, '../public/index.html');

try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Helper to escape HTML special characters for attributes
    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    // Helper to replace meta tags regardless of formatting
    const replaceMeta = (property, content) => {
        const escapedContent = escapeHtml(content);
        const regex = new RegExp(`<meta\\s+property="${property}"[\\s\\S]*?\\/>`, 'g');
        const replacement = `<meta property="${property}" content="${escapedContent}" />`;
        if (regex.test(html)) {
            html = html.replace(regex, replacement);
        } else {
            console.warn(
                `Warning: Meta tag with property "${property}" not found, appending to head if possible.`,
            );
        }
    };

    // Update <title>
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.name)}</title>`);

    replaceMeta('og:title', metadata.name);
    replaceMeta('og:description', metadata.description);
    replaceMeta('og:url', metadata.homepage);

    const imageUrl = `${metadata.homepage}/icon.png`;
    replaceMeta('og:image', imageUrl);

    replaceMeta('twitter:title', metadata.name);
    replaceMeta('twitter:description', metadata.description);
    replaceMeta('twitter:url', metadata.homepage);
    replaceMeta('twitter:image', imageUrl);

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully updated public/index.html with metadata.');
} catch (error) {
    console.error('Error updating metadata:', error);
    process.exit(1);
}
