import fs from 'fs';
import path from 'path';

describe('Web Deployment CI/CD Configuration Validation', () => {
    it('should have the web build command in netlify.toml', () => {
        const netlifyPath = path.join(process.cwd(), 'netlify.toml');
        expect(fs.existsSync(netlifyPath)).toBe(true);
        const netlifyContent = fs.readFileSync(netlifyPath, 'utf8');
        expect(netlifyContent).toContain('pnpm run build:web');
        expect(netlifyContent).toContain('NODE_VERSION = "24"');
    });

    it('should have the web build command in GitHub Actions deploy workflow', () => {
        const githubActionPath = path.join(process.cwd(), '.github/workflows/deploy.yml');
        expect(fs.existsSync(githubActionPath)).toBe(true);
        const actionContent = fs.readFileSync(githubActionPath, 'utf8');
        expect(actionContent).toContain('pnpm build:web');
        expect(actionContent).toContain('node-version: 24');
    });
});
