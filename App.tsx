import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme, LinkingOptions } from '@react-navigation/native';
import { EventProvider } from './src/context/EventContext';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, Oswald_400Regular, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { theme } from './src/theme';
import { RootStackParamList } from './src/navigation/types';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['apexsociety://', 'https://apexsociety.github.io/apexsociety'],
    config: {
        screens: {
            Main: {
                screens: {
                    Map: 'map',
                    Events: 'events',
                    Menu: 'menu',
                    Crews: 'crews',
                    Profile: 'profile',
                },
            },
            CreateEvent: 'create-event',
        },
    },
};

export default function App() {
    const [fontsLoaded] = useFonts({
        Oswald_400Regular,
        Oswald_700Bold,
        Roboto_400Regular,
        Roboto_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const customTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            background: theme.colors.background,
            primary: theme.colors.primary,
            card: theme.colors.card,
            text: theme.colors.text,
            border: theme.colors.border,
        },
    };

    return (
        <SafeAreaProvider>
            <EventProvider>
                <NavigationContainer theme={customTheme} linking={linking}>
                    <StatusBar style="light" />
                    <AppNavigator />
                </NavigationContainer>
            </EventProvider>
        </SafeAreaProvider>
    );
}
