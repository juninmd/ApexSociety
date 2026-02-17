# Android Build & Release Rules

## Security & Secrets

1.  **NEVER commit keystore files**: `.keystore`, `.jks`, or `.p12` files must strictly be ignored in `.gitignore`.
2.  **NEVER hardcode passwords**: Signing configurations in `build.gradle` must always read from environment variables or `gradle.properties` (which is also git-ignored).
3.  **Validate Secrets**: Before suggesting a CI fix involving signing, ask the user to verify `ANDROID_KEYSTORE_BASE64` and passwords if the error implies a credential mismatch.

## Versioning & Release

4.  **Version Code Management**: Always check `android.versionCode` in `app.json` before a release. It must be an integer and strictly increasing.
5.  **Release Notes**: When generating a release, always propose including a summary of changes (changelog) in the GitHub Release body.

## Build Configuration

6.  **Java Version**: Expo SDK 50+ typically requires Java 17. Always ensure `actions/setup-java` uses `distribution: 'zulu'` and `java-version: '17'`.
7.  **Expo Prebuild**: Always prefer `npx expo prebuild --platform android --no-install` in CI to ensure the native code matches the current JS usage and `app.json` config.
8.  **Artifact Retention**: Ensure both `.apk` (for direct testing) and `.aab` (for Play Store) are uploaded as artifacts in the CI pipeline.
