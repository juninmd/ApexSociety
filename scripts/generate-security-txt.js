const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, '../src/constants/metadata.json');
const outputPath = path.join(__dirname, '../public/.well-known/security.txt');

try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    // Allow environment variables to override metadata
    // Check PUBLIC_URL (standard), URL (Netlify), or HOMEPAGE (legacy/GitHub Pages)
    const homepage =
        process.env.PUBLIC_URL || process.env.URL || process.env.HOMEPAGE || metadata.homepage;
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;

    const securityTxtContent = `Contact: mailto:security@apexsociety.com
Expires: 2026-12-31T23:59:59Z
Preferred-Languages: en
Canonical: ${cleanHomepage}/.well-known/security.txt
`;

    fs.writeFileSync(outputPath, securityTxtContent, 'utf8');
    console.log(
        `Successfully generated public/.well-known/security.txt with canonical: ${cleanHomepage}/.well-known/security.txt`,
    );
} catch (error) {
    console.error('Error generating security.txt:', error);
    process.exit(1);
}
