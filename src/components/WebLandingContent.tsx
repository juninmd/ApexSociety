import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Map } from 'lucide-react-native';
import { theme } from '../theme';
import metadata from '../constants/metadata.json';

interface WebLandingContentProps {
    handleReportBlitz: () => void;
    handleDownloadApp: () => void;
    handleExploreEvents: () => void;
}

export default function WebLandingContent({
    handleReportBlitz,
    handleDownloadApp,
    handleExploreEvents,
}: WebLandingContentProps) {
    return (
        <View style={styles.content}>
            <Map size={64} color={theme.colors.primary} style={styles.icon} />
            <Text style={styles.title}>A Comunidade Definitiva de Entusiastas de Carros</Text>
            <Text style={styles.subtitle}>
                Conecte-se com motoristas locais, descubra encontros e receba alertas de blitz em
                tempo real. Inspirado no First2. Baixe o {metadata.name} para a experiência
                completa!
            </Text>

            <TouchableOpacity
                style={styles.reportButton}
                onPress={handleReportBlitz}
                activeOpacity={0.8}
            >
                <Text style={styles.reportButtonText}>REPORTAR BLITZ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleDownloadApp} activeOpacity={0.8}>
                <Text style={styles.buttonText}>BAIXE O APP MOBILE</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleExploreEvents}
                activeOpacity={0.8}
            >
                <Text style={styles.secondaryButtonText}>EXPLORAR EVENTOS</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        maxWidth: 400,
        zIndex: 1,
    },
    icon: {
        marginBottom: 24,
    },
    title: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 48,
        marginBottom: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    subtitle: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 48,
        lineHeight: 28,
    },
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
    reportButton: {
        backgroundColor: theme.colors.error,
        paddingHorizontal: 48,
        paddingVertical: 16,
        transform: [{ skewX: '-20deg' }],
        shadowColor: theme.colors.error,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    reportButtonText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        fontWeight: 'bold',
        transform: [{ skewX: '20deg' }],
        letterSpacing: 1,
    },
});
