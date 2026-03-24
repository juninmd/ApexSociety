import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Map } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { theme } from '../theme';
import metadata from '../constants/metadata.json';
import { RootTabParamList } from '../navigation/types';

export default function MapScreen() {
    const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

    const handleReportBlitz = () => {
        if (typeof window !== 'undefined') {
            window.alert('Blitz reportada! Alerta emitido para a rede ApexSociety.');
        }
    };

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.card]}
            style={styles.container}
        >
            <View style={styles.overlay} />
            <View style={styles.content}>
                <Map size={64} color={theme.colors.primary} style={styles.icon} />
                <Text style={styles.title}>Corridas de Rua, Eventos & Alertas de Blitz</Text>
                <Text style={styles.subtitle}>
                    O mapa interativo em tempo real é otimizado para nosso aplicativo mobile. Baixe o{' '}
                    {metadata.name} para marcar corridas de rua, visualizar alertas de blitz e ver quem está
                    na sua área!
                </Text>

                <TouchableOpacity
                    style={styles.reportButton}
                    onPress={handleReportBlitz}
                    activeOpacity={0.8}
                >
                    <Text style={styles.reportButtonText}>REPORTAR BLITZ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Linking.openURL(metadata.githubUrl)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>BAIXE O APP MOBILE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('Events')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.secondaryButtonText}>EXPLORAR EVENTOS</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    overlay: {
        position: 'absolute',
        top: -100,
        left: -50,
        right: -50,
        height: 400,
        backgroundColor: theme.colors.primary,
        opacity: 0.05,
        transform: [{ skewY: '-10deg' }],
        zIndex: 0,
    },
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
