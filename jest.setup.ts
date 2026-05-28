import React from 'react';
import { View } from 'react-native';

jest.mock('react-native-maps', () => {
    return {
        __esModule: true,
        default: (props: any) => React.createElement(View, props),
        Marker: (props: any) => React.createElement(View, props),
        PROVIDER_DEFAULT: 'default',
        PROVIDER_GOOGLE: 'google',
    };
});

jest.mock('@expo-google-fonts/oswald', () => ({
    useFonts: () => [true],
    Oswald_400Regular: 'Oswald_400Regular',
    Oswald_700Bold: 'Oswald_700Bold',
}));

jest.mock('@expo-google-fonts/roboto', () => ({
    Roboto_400Regular: 'Roboto_400Regular',
    Roboto_700Bold: 'Roboto_700Bold',
}));

jest.mock('expo-font', () => ({
    isLoaded: jest.fn(() => true),
    loadAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-safe-area-context', () => {
    const inset = { top: 0, right: 0, bottom: 0, left: 0 };
    return {
        SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
        SafeAreaConsumer: ({ children }: { children: (inset: { top: number; right: number; bottom: number; left: number }) => React.ReactNode }) => children(inset),
        useSafeAreaInsets: () => inset,
        useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
    };
});

jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual('@react-navigation/native'),
        NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
    };
});

jest.mock('expo-status-bar', () => ({
    StatusBar: () => null,
}));

jest.mock('expo-linking', () => ({
    createURL: (url: string) => url,
}));