import fs from 'fs';
import path from 'path';
import metadata from '../src/constants/metadata.json';

describe('Metadata Consistency', () => {
    const indexPath = path.join(process.cwd(), 'public/index.html');
    const publicIndexHtml = fs.readFileSync(indexPath, 'utf-8');

    it('should have correct title in index.html', () => {
        expect(publicIndexHtml).toContain(`<title>${metadata.name}</title>`);
    });

    it('should have correct og:title', () => {
        expect(publicIndexHtml).toContain(`<meta property="og:title" content="${metadata.name}" />`);
    });

    it('should have correct og:description', () => {
        expect(publicIndexHtml).toContain(metadata.description);
    });

    it('should have correct og:url', () => {
        expect(publicIndexHtml).toContain(`<meta property="og:url" content="${metadata.homepage}" />`);
    });
});
