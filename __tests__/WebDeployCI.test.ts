import fs from 'fs';
import path from 'path';

describe('Web Deployment CI/CD Configuration Validation', () => {
    it('should have the web build command in GitHub Actions deploy workflow', () => {
        const githubActionPath = path.join(process.cwd(), '.github/workflows/deploy.yml');
        expect(fs.existsSync(githubActionPath)).toBe(true);
        const actionContent = fs.readFileSync(githubActionPath, 'utf8');
        expect(actionContent).toContain('pnpm build:gh-pages');
        expect(actionContent).toContain('cancel-in-progress: false');
        expect(actionContent).toContain('node-version: 24');
    });
});
