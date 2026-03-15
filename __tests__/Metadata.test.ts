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
        expect(publicIndexHtml).toContain(
            `<meta property="og:title" content="${metadata.name}" />`,
        );
    });

    it('should have correct og:description', () => {
        expect(publicIndexHtml).toContain(metadata.description);
    });

    it('should have correct og:url', () => {
        expect(publicIndexHtml).toContain(
            `<meta property="og:url" content="${metadata.homepage}" />`,
        );
    });

    it('should have correct author', () => {
        expect(publicIndexHtml).toContain(`<meta name="author" content="${metadata.author}" />`);
    });

    it('should have correct keywords', () => {
        expect(publicIndexHtml).toContain(
            `<meta name="keywords" content="${metadata.keywords}" />`,
        );
    });

    it('should have correct theme-color', () => {
        expect(publicIndexHtml).toContain(
            `<meta name="theme-color" content="${metadata.themeColor}" />`,
        );
    });

    it('should have correct PWA meta tags', () => {
        expect(publicIndexHtml).toContain(
            `<meta name="apple-mobile-web-app-capable" content="yes" />`,
        );
        expect(publicIndexHtml).toContain(
            `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`,
        );
    });

    it('should have correct social metadata', () => {
        expect(publicIndexHtml).toContain(
            `<meta name="twitter:site" content="${metadata.twitterUsername}" />`,
        );
        expect(publicIndexHtml).toContain(
            `<meta property="og:site_name" content="${metadata.siteName}" />`,
        );
        expect(publicIndexHtml).toContain(
            `<meta property="og:locale" content="${metadata.locale.replace('-', '_')}" />`,
        );
    });
});
