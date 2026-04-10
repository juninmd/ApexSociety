import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Map } from 'lucide-react-native';
import { theme } from '../theme';
import metadata from '../constants/metadata.json';

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

            <View style={styles.hazardsContainer}>
                <TouchableOpacity
                    style={styles.reportButton}
                    onPress={handleReportBlitz}
                    activeOpacity={0.8}
                >
                    <Text style={styles.reportButtonText}>BLITZ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.reportButton,
                        { backgroundColor: '#f39c12', shadowColor: '#f39c12' },
                    ]}
                    onPress={handleReportRadar}
                    activeOpacity={0.8}
                >
                    <Text style={styles.reportButtonText}>RADAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.reportButton,
                        { backgroundColor: '#e74c3c', shadowColor: '#e74c3c' },
                    ]}
                    onPress={handleReportAcidente}
                    activeOpacity={0.8}
                >
                    <Text style={styles.reportButtonText}>ACIDENTE</Text>
                </TouchableOpacity>
            </View>

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
    hazardsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    reportButton: {
        backgroundColor: theme.colors.error,
        paddingHorizontal: 24,
        paddingVertical: 12,
        transform: [{ skewX: '-20deg' }],
        shadowColor: theme.colors.error,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    reportButtonText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        fontWeight: 'bold',
        transform: [{ skewX: '20deg' }],
        letterSpacing: 1,
    },
});
