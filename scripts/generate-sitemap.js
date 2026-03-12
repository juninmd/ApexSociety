const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, '../src/constants/metadata.json');
const outputPath = path.join(__dirname, '../public/sitemap.xml');

try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    // Allow environment variables to override metadata
    // Check PUBLIC_URL (standard), URL (Netlify), or HOMEPAGE (legacy/GitHub Pages)
    const homepage =
        process.env.PUBLIC_URL || process.env.URL || process.env.HOMEPAGE || metadata.homepage;
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;

    // Current date in YYYY-MM-DD format
    const lastMod = new Date().toISOString().split('T')[0];

    // Basic sitemap content
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${cleanHomepage}/</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`;

    fs.writeFileSync(outputPath, sitemap, 'utf8');
    console.log(`Successfully generated public/sitemap.xml with homepage: ${cleanHomepage}`);
} catch (error) {
    console.error('Error generating sitemap.xml:', error);
    process.exit(1);
}
