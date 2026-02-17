---
description: Comprehensive guide for building, signing, and releasing Android applications using Expo and GitHub Actions.
---

# Android Build & Release Skill

This skill provides step-by-step instructions and best practices for managing the Android build lifecycle for Expo-based React Native applications.

## 1. Prerequisites & Secrets

Before triggering a build, ensure the following secrets are configured in the GitHub Repository settings:

| Secret Name                 | Description                                                           |
| :-------------------------- | :-------------------------------------------------------------------- |
| `ANDROID_KEYSTORE_BASE64`   | Base64 encoded content of your `release.keystore` file.               |
| `ANDROID_KEYSTORE_PASSWORD` | Password for the keystore file.                                       |
| `ANDROID_KEY_ALIAS`         | Alias name for the key within the keystore.                           |
| `ANDROID_KEY_PASSWORD`      | Password for the specific key alias.                                  |
| `GOOGLE_SERVICES_JSON`      | Content of `google-services.json` (if using Firebase/Google Sign-In). |

### Generating the Keystore Base64

To generate the base64 string for `ANDROID_KEYSTORE_BASE64`:

```bash
openssl base64 -in android/app/release.keystore -out base64_keystore.txt
```

Copy the contents of `base64_keystore.txt` into the GitHub Secret.

## 2. CI/CD Workflow (`.github/workflows/ci.yml`)

The CI pipeline handles the heavy lifting. Key phases:

1.  **Environment Setup**:
    - `actions/setup-node`: Configures Node.js.
    - `actions/setup-java`: Configures Java 17 (Zulu) which is required for modern Android builds.
    - `gradle/actions/setup-gradle`: Optimizes Gradle builds with caching.

2.  **Versioning**:
    - The workflow automatically tags releases using the `github.run_number` (e.g., `v1.0.123`).
    - **Crucial**: Ensure `versionCode` in `app.json` is either incremented or managed automatically.

3.  **Expo Prebuild**:
    - `npx expo prebuild --platform android --no-install`
    - This generates the native `android/` directory based on your `app.json` configuration.
    - _Note_: We use `--no-install` to skip `pod install` (iOS) and speed up the process, as we handle dependencies via `pnpm`.

4.  **Keystore Decoding**:
    - The `release.keystore` is decoded from the secret during the build process:

    ```yaml
    echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 --decode > android/app/release.keystore
    ```

5.  **Gradle Build**:
    - Generates both APK (universal) and AAB (Play Store bundle).
    ```bash
    ./gradlew assembleRelease bundleRelease
    ```

## 3. Troubleshooting Common Issues

### Gradle OOM (Out of Memory)

If the build fails with `java.lang.OutOfMemoryError`, increase the heap size in `android/gradle.properties`:

```properties
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m
```

### Keystore Errors

- **"Keystore was tampered with, or password was incorrect"**: Double-check `ANDROID_KEYSTORE_PASSWORD` and `ANDROID_KEY_PASSWORD`. They might be identical or different depending on how you created the key.
- **"Alias not found"**: Verify `ANDROID_KEY_ALIAS` matches exactly what is in the keystore (case-sensitive).

### Version Code Conflict

- Play Store rejects APKs with usage of version codes that have already been uploaded.
- **Fix**: Increment `android.versionCode` in `app.json` or ensure your CI uses `GITHUB_RUN_NUMBER` to override it dynamically in `build.gradle`.

## 4. Local Testing

To test the build process locally (requires Android Studio/SDK setup):

1.  Run prebuild: `npx expo prebuild --platform android`
2.  Navigate to android: `cd android`
3.  Run assemble: `./gradlew assembleRelease`

_Note_: You will need the physical `release.keystore` file in `android/app/` for the release build to succeed locally, or configure `gradle.properties` to point to it.

## 5. Resources

- [Example Workflow](resources/workflow.yml): A complete GitHub Actions workflow file that you can copy to `.github/workflows/android_release.yml`.
