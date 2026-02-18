import { ExpoConfig, ConfigContext } from 'expo/config';
import metadata from './src/constants/metadata.json';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: metadata.name,
    slug: metadata.slug,
    description: metadata.description,
    githubUrl: metadata.githubUrl,
    version: metadata.version,
    orientation: 'portrait',
    scheme: metadata.scheme,
    platforms: ['ios', 'android', 'web'],
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    ios: {
        supportsTablet: true,
    },
    android: {
        package: 'com.apexsociety',
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#ffffff',
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
    },
    web: {
        bundler: 'metro',
        favicon: './assets/favicon.png',
        name: metadata.name,
        shortName: metadata.name,
        description: metadata.description,
        startUrl: '/',
        scope: '/',
        display: 'standalone',
        themeColor: '#000000',
        backgroundColor: '#000000',
    },
    experiments: {
        baseUrl: process.env.GH_PAGES ? '/apexsociety' : '/',
    },
});
