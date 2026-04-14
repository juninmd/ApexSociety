import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Map } from 'lucide-react-native';
import { theme } from '../theme';
import metadata from '../constants/metadata.json';
import Hazards from './WebLanding/Hazards';
import Buttons from './WebLanding/Buttons';

interface WebLandingContentProps {
    handleReportBlitz: () => void;
    handleReportRadar: () => void;
    handleReportAcidente: () => void;
    handleDownloadApp: () => void;
    handleExploreEvents: () => void;
}

export default function WebLandingContent({
    handleReportBlitz,
    handleReportRadar,
    handleReportAcidente,
    handleDownloadApp,
    handleExploreEvents,
}: WebLandingContentProps) {
    return (
        <View style={styles.content}>
            <View style={styles.iconContainer}>
                <Map size={72} color={theme.colors.primary} style={styles.icon} />
                <View style={styles.iconGlow} />
            </View>
            <Text style={styles.title}>Underground Racing & Car Meets</Text>
            <Text style={styles.subtitle}>
                O mapa interativo em tempo real é otimizado para nosso aplicativo mobile. Inspirado{' '}
                pelo FIRST2, o {metadata.name} é a comunidade definitiva para marcar corridas de
                rua, organizar eventos de carro, construir sua equipe, visualizar alertas de blitz e
                ver quem está na sua área!
            </Text>

            <Hazards
                handleReportBlitz={handleReportBlitz}
                handleReportRadar={handleReportRadar}
                handleReportAcidente={handleReportAcidente}
            />

            <Buttons
                handleDownloadApp={handleDownloadApp}
                handleExploreEvents={handleExploreEvents}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        maxWidth: 500,
        zIndex: 1,
    },
    iconContainer: {
        position: 'relative',
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        zIndex: 2,
    },
    iconGlow: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary,
        opacity: 0.3,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
        zIndex: 1,
    },
    title: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 48,
        marginBottom: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 3,
        textShadowColor: theme.colors.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    subtitle: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 48,
        lineHeight: 28,
        paddingHorizontal: 20,
    },
});
