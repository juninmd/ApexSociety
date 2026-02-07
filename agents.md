# ApexSociety - Agent Documentation

This document serves as a guide for AI agents and developers working on the **ApexSociety** codebase.

## Project Overview
ApexSociety is a social platform for car enthusiasts. It helps users find car meets, join crews, and share their automotive lifestyle.
**Location**: `D:\Solutions\pessoal\ApexSociety`

## Architecture
- **Framework**: React Native (Expo Managed Workflow)
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Styling**: `StyleSheet` with a custom Dark Theme (Colors: `#121212` bg, `#FFD700` accent).
- **Design System**: "Stitch" - characterized by jagged edges, diagonal overlays, and high-contrast neon accents.

## Directory Structure
- `src/components`: Reusable UI components (Buttons, Cards, Badges).
- `src/screens`: Main application screens (Map, Events, Profile).
- `src/navigation`: Navigation configuration and types.
- `assets`: Static assets (images, fonts).

## Development Workflow
1.  **Install Dependencies**: `pnpm install`
2.  **Start Dev Server**: `pnpm expo start`
3.  **Lint/Type Check**: `pnpm run lint` / `pnpm run type-check`

## CI/CD Pipeline
The project uses GitHub Actions for continuous delivery.
- **Workflow File**: `.github/workflows/android_build.yml`
- **Triggers**: Push to `main`, Release Tags.
- **Artifacts**: Signed APK (Debug/Release) and AAB (Release).
- **Secrets Required**: `ANDROID_KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.

## Key Features to Implement
- [ ] **Real-time Map**: Users visible on map.
- [ ] **Crew Management**: Create/Join crews.
- [ ] **Event Scheduling**: Create meets with location/time.
