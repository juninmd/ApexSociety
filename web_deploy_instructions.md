## Deploying Web Version

### 1. GitHub Pages (Automated CI/CD)
The web version is already configured to deploy automatically via GitHub Pages. Any pushes to `main` branch will automatically build and update `https://apexsociety.github.io/apexsociety/` using the `.github/workflows/deploy.yml` workflow.

### 2. Netlify (Automated CI/CD or Manual)
If you specifically want to deploy to **Netlify**, the configuration is already fully present in `netlify.toml`.

**Option A: Automated via GitHub Integration**
1. Log into Netlify.
2. Select "Add new site" -> "Import an existing project".
3. Choose GitHub, and authorize access to this repository.
4. Netlify will automatically read the `netlify.toml` file and detect `pnpm run build:web` as the build command and `dist` as the publish directory.
5. Click "Deploy site".

**Option B: Manual CLI Deployment**
If you wish to immediately test and publish a version via terminal:
1. Make sure you are logged in to the Netlify CLI by running `npx netlify login`.
2. Build and deploy the project by running: `pnpm run deploy:netlify`.
   *(This uses `netlify deploy --prod --dir=dist` underneath).*
