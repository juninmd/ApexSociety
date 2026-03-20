# ApexSociety Setup Guide

## 1. Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- JDK 17 (for Android builds)
- Android Studio (optional, for local emulation)

## 2. Project Setup

```bash
# Install dependencies
pnpm install

# Start the app
pnpm expo start
```

## 3. GitHub Actions & CI/CD

This project is configured to automatically build and release Android artifacts (APK/AAB) on GitHub.

### Setting up Secrets

To enable the build pipeline, you must set the following secrets in your GitHub Repository settings (Settings > Secrets and variables > Actions):

| Secret Name               | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `ANDROID_KEYSTORE_BASE64` | Base64 encoded content of your `release.keystore` file. |
| `ANDROID_KEYSTORE_PASSWORD`       | Password for the keystore.                              |
| `ANDROID_KEY_ALIAS`               | Alias of the key in the keystore.                       |
| `ANDROID_KEY_PASSWORD`            | Password for the key.                                   |

### Generating a Keystore

Run the following command in your terminal (requires Java JDK):

```bash
keytool -genkey -v -keystore release.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Then, encode it to Base64 to copy to GitHub:

```bash
# PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("release.keystore")) | Clip
# Mac/Linux
base64 release.keystore | pbcopy
```

## 4. Releasing

- **Development**: Push to `main` branch to trigger a build check.
- **Production**: Create a tag starting with `v` (e.g., `v1.0.0`) to trigger a Release build (AAB) and GitHub Release.

## 5. Web Version

The application is configured to be deployed as a static web app on GitHub Pages or Netlify.

### GitHub Pages

- **Build Command**: `pnpm run build:gh-pages` (Handles subpath `/apexsociety`)
- **Deploy**: Automatically triggers on push to `main` branch via GitHub Actions.
- **URL**: `https://apexsociety.github.io/apexsociety/`

### Netlify

- **Build Command**: `pnpm run build:web` (Assumes root path `/`)
- **Deploy**: Connect your repository to Netlify and set the build command to `pnpm run build:web` and publish directory to `dist`.

## 6. Code Quality

We use Husky and lint-staged to ensure code quality.

- **Pre-commit**: ESLint and Prettier run automatically on staged files.
- **Manual Check**: `pnpm lint` / `pnpm type-check`

## 7. Project Structure

- `src/screens`: Main screens (Map, Crew, Events).
- `src/components`: Reusable UI components.
- `src/navigation`: Navigation setup.
- `assets`: Images and fonts.

## 8. Stitch Integration

UI designs were generated using Stitch.
