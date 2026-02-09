import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, Oswald_400Regular, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

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
            background: '#121212',
            primary: '#FFD700',
            card: '#1E1E1E',
            text: '#FFFFFF',
            border: '#2C2C2C',
        },
    };

    return (
        <SafeAreaProvider>
            <NavigationContainer theme={customTheme}>
                <StatusBar style="light" />
                <AppNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
