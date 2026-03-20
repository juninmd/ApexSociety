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

    // Helper to replace or insert meta tags
    const updateMeta = (key, content, attribute = 'property') => {
        const escapedContent = escapeHtml(content);
        const tag = `<meta ${attribute}="${key}" content="${escapedContent}" />`;

        // Regex to match existing tag with either 'name' or 'property'
        // Handles attributes in any order, different quote types, and optional closing slash
        const regex = new RegExp('<meta\\s+[^>]*?(?:name|property)=[\"\']' + key + '[\"\'][^>]*?\\/?>', 'g');

        if (regex.test(html)) {
            html = html.replace(regex, tag);
        } else {
            // Insert before </head>
            if (html.includes('</head>')) {
                html = html.replace('</head>', `    ${tag}\n    </head>`);
            } else {
                console.warn(
                    `Warning: Could not find </head> tag to insert meta ${attribute}="${key}".`,
                );
            }
        }
    };

    // Update <title>
    const titleTag = `<title>${escapeHtml(metadata.name)}</title>`;
    if (/<title>[\s\S]*?<\/title>/.test(html)) {
        html = html.replace(/<title>[\s\S]*?<\/title>/, titleTag);
    } else {
        if (html.includes('</head>')) {
            html = html.replace('</head>', `    ${titleTag}\n    </head>`);
        }
    }

    // Open Graph (uses property)
    updateMeta('og:type', 'website', 'property');
    updateMeta('og:title', metadata.name, 'property');
    updateMeta('og:description', metadata.description, 'property');
    updateMeta('og:url', metadata.homepage, 'property');

    const imageUrl = `${metadata.homepage}/icon.png`;
    updateMeta('og:image', imageUrl, 'property');

    // Twitter (uses name)
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:title', metadata.name, 'name');
    updateMeta('twitter:description', metadata.description, 'name');
    updateMeta('twitter:url', metadata.homepage, 'name');
    updateMeta('twitter:image', imageUrl, 'name');

    // Standard description
    updateMeta('description', metadata.description, 'name');

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully updated public/index.html with metadata.');
} catch (error) {
    console.error('Error updating metadata:', error);
    process.exit(1);
}
