const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, '../src/constants/metadata.json');
const templatePath = path.join(__dirname, '../public/index.template.html');
const outputPath = path.join(__dirname, '../public/index.html');

try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    let html = fs.readFileSync(templatePath, 'utf8');

    // Allow environment variables to override metadata
    // Check PUBLIC_URL (standard), URL (Netlify), or HOMEPAGE (legacy/GitHub Pages)
    const homepage =
        process.env.PUBLIC_URL || process.env.URL || process.env.HOMEPAGE || metadata.homepage;
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;

    const imageUrl = `${cleanHomepage}/icon.png`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: metadata.name,
        url: cleanHomepage,
        description: metadata.description,
        author: {
            '@type': 'Organization',
            name: metadata.author,
        },
        image: imageUrl,
    };

    const replacements = {
        '{{TITLE}}': metadata.name,
        '{{DESCRIPTION}}': metadata.description,
        '{{URL}}': cleanHomepage,
        '{{IMAGE_URL}}': imageUrl,
        '{{AUTHOR}}': metadata.author,
        '{{KEYWORDS}}': metadata.keywords,
        '{{THEME_COLOR}}': metadata.themeColor,
        '{{TWITTER_USERNAME}}': metadata.twitterUsername,
        '{{SITE_NAME}}': metadata.siteName,
        '{{LOCALE}}': metadata.locale,
        '{{JSON_LD}}': JSON.stringify(jsonLd, null, 4).replace(/</g, '\\u003c').replace(/\n/g, '\n        '), // Indent for proper HTML formatting
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
        // Replace all occurrences using split/join as a global replace
        html = html.split(placeholder).join(value || '');
    });

    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`Successfully generated public/index.html with homepage: ${cleanHomepage}`);
} catch (error) {
    console.error('Error generating index.html:', error);
    process.exit(1);
}
