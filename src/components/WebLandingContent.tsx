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
            <Map size={64} color={theme.colors.primary} style={styles.icon} />
            <Text style={styles.title}>Corridas de Rua, Eventos & Alertas de Blitz</Text>
            <Text style={styles.subtitle}>
                O mapa interativo em tempo real é otimizado para nosso aplicativo mobile. Inspirado{' '}
                pelo FIRST2, o {metadata.name} é o lugar perfeito para marcar corridas de rua,{' '}
                organizar eventos de carro, visualizar alertas de blitz e ver quem está na sua área!
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
        maxWidth: 400,
        zIndex: 1,
    },
    icon: {
        marginBottom: 24,
    },
    title: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 42,
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
});
