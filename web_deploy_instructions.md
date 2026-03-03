## Deploying Web Version
The web version is already configured to deploy automatically via GitHub Pages. Any pushes to `main` branch will automatically build and update `https://apexsociety.github.io/apexsociety/` using the `.github/workflows/deploy-web.yml` workflow.

If you specifically want to deploy to **Netlify**, the configuration is already fully present in `netlify.toml`. All you have to do is:
1. Log into Netlify.
2. Select "Add new site" -> "Import an existing project".
3. Choose GitHub, and authorize access to this repository.
4. Netlify will automatically read the `netlify.toml` file and detect `pnpm run build:web` as the build command and `dist` as the publish directory.
5. Click "Deploy site".
