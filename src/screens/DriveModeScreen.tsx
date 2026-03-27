import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShieldAlert, Map as MapIcon, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAlert } from '../context/AlertContext';
import { theme } from '../theme';

export default function DriveModeScreen() {
    const navigation = useNavigation();
    const { showAlert } = useAlert();
    const [speed, setSpeed] = useState(0);

    useEffect(() => {
        // Mock speed update for visual effect
        const interval = setInterval(() => {
            setSpeed((prev) => {
                const newSpeed = prev + (Math.random() > 0.5 ? 2 : -1);
                return Math.max(0, Math.min(newSpeed, 120)); // Keep between 0 and 120
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleReportBlitz = () => {
        showAlert('Blitz reportada! Alerta emitido para a rede.');
    };

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.card]}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                    <X color={theme.colors.white} size={32} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MODO DE DIREÇÃO</Text>
                <View style={{ width: 32 }} />
            </View>

            <View style={styles.speedometerContainer}>
                <Text style={styles.speedText}>{Math.round(speed)}</Text>
                <Text style={styles.unitText}>KM/H</Text>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.reportButton}
                    onPress={handleReportBlitz}
                    activeOpacity={0.8}
                >
                    <ShieldAlert color={theme.colors.white} size={48} />
                    <Text style={styles.reportButtonText}>REPORTAR BLITZ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.mapButton}
                    onPress={() => {
                        navigation.goBack();
                        // Assuming Main tab navigator is below
                    }}
                    activeOpacity={0.8}
                >
                    <MapIcon color={theme.colors.black} size={32} />
                    <Text style={styles.mapButtonText}>VER MAPA</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        padding: 10,
    },
    headerTitle: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        letterSpacing: 2,
    },
    speedometerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    speedText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 120,
        textShadowColor: theme.colors.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    unitText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 32,
        letterSpacing: 4,
    },
    actionsContainer: {
        gap: 20,
    },
    reportButton: {
        backgroundColor: theme.colors.error,
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        shadowColor: theme.colors.error,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 10,
    },
    reportButtonText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        letterSpacing: 1,
    },
    mapButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
    },
    mapButtonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 20,
        letterSpacing: 1,
    },
});
