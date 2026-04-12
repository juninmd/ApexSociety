import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface ButtonsProps {
    handleDownloadApp: () => void;
    handleExploreEvents: () => void;
}

export default function Buttons({ handleDownloadApp, handleExploreEvents }: ButtonsProps) {
    return (
        <>
            <TouchableOpacity style={styles.button} onPress={handleDownloadApp} activeOpacity={0.8}>
                <Text style={styles.buttonText}>VER CÓDIGO FONTE</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleExploreEvents}
                activeOpacity={0.8}
            >
                <Text style={styles.secondaryButtonText}>ACESSAR O APP WEB</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 48,
        paddingVertical: 16,
        transform: [{ skewX: '-20deg' }],
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        fontWeight: 'bold',
        transform: [{ skewX: '20deg' }],
        letterSpacing: 1,
    },
    secondaryButton: {
        marginTop: 20,
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        transform: [{ skewX: '-20deg' }],
    },
    secondaryButtonText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        fontWeight: 'bold',
        transform: [{ skewX: '20deg' }],
        letterSpacing: 1,
    },
});
