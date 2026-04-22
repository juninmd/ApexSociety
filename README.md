# 🏔️ ApexSociety (Mobile)

[![Expo](https://img.shields.io/badge/Expo-54.x-000000?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_SITE_API_ID/deploy-status)](https://apexsociety.netlify.app/)
[![GitHub Pages Status](https://github.com/juninmd/ApexSociety/actions/workflows/deploy.yml/badge.svg)](https://juninmd.github.io/ApexSociety/)
[![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()

> O app definitivo para entusiastas de carros e corridas underground, inspirado no FIRST2. Ideal para marcar corridas de rua, eventos de carro e encontros automotivos. Crie sua equipe e receba alertas de blitz, radar e acidentes em tempo real!

## 🌐 Live Web Version (Visualização Automática)

O aplicativo foi disponibilizado na web via **Netlify** e **GitHub Pages** para facilitar a visualização de encontros e equipes diretamente pelo navegador, sem necessidade de instalação!

- **[🚀 Acessar Versão Netlify](https://apexsociety.netlify.app/)** (Recomendado)
- **[Acessar Versão GitHub Pages](https://juninmd.github.io/ApexSociety/)**

_Os deploys para ambas as plataformas são configurados para atualizar automaticamente a cada push na branch `main`. Você também pode acionar o deploy manual para o Netlify rodando `pnpm run deploy:netlify` localmente após a build (`pnpm build:web`)._

## ✨ Features

- **Immersive Visuals**: High-fidelity UI with linear gradients and glassmorphism effects (Expo Blur).
- **Geospatial Intelligence**: Integrated maps and location services via `react-native-maps` and `expo-location`.
- **Custom Typography**: Premium font integration using Google Fonts (Oswald & Roboto).
- **Fluid Navigation**: Native-stack and bottom-tab navigation for a seamless user journey.
- **Strict Verification**: Type-checked and linted following Antigravity standards.

## 🛠️ Tech Stack

- **Framework**: Expo 54 (React Native)
- **Styling**: Linear Gradient + SVG + Blur
- **Navigation**: React Navigation 7
- **Maps**: React Native Maps
- **State**: React Context / Hooks

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start the Expo development server
pnpm start

# Run on Android/iOS
pnpm android
pnpm ios
```

## 🛡️ Antigravity Protocol

This project adheres to the **Antigravity** code standards:

- **150-Line Limit**: Mandatory for keeping UI components and logic hooks lean.
- **Strict Typing**: Full TypeScript coverage across all screens and services.
- **Pure Components**: Preference for functional components and specialized hooks.

---

_"Reach the peak of mobile excellence."_
