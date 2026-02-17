import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'ApexSociety',
    slug: 'ApexSociety',
    description:
        'ApexSociety - The social platform for car enthusiasts. Find meets, join crews, and share your automotive lifestyle.',
    githubUrl: 'https://github.com/apexsociety/apexsociety',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'apexsociety',
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
        name: 'ApexSociety',
        shortName: 'ApexSociety',
        description:
            'ApexSociety - The social platform for car enthusiasts. Find meets, join crews, and share your automotive lifestyle.',
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
