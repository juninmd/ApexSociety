import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertTriangle, Map, X } from 'lucide-react-native';
import { useAlert } from '../context/AlertContext';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/types';

type DriveModeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DriveMode'>;

export default function DriveModeScreen() {
    const navigation = useNavigation<DriveModeScreenNavigationProp>();
    const { showAlert } = useAlert();
    const [speed, setSpeed] = useState(0);

    // Mock speed logic for the speedometer
    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed((prev) => {
                const change = Math.floor(Math.random() * 5) - 2;
                const newSpeed = prev + change;
                return Math.max(0, Math.min(newSpeed, 120)); // Limit between 0 and 120
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleReportBlitz = () => {
        showAlert('Blitz reported! Alert issued to the ApexSociety network.');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={[theme.colors.background, theme.colors.card]}
                style={styles.container}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => navigation.goBack()}
                        accessibilityLabel="Close Drive Mode"
                        testID="close-button"
                    >
                        <X size={32} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>DRIVE MODE</Text>
                    <View style={styles.headerRight} />
                </View>
                <View style={styles.dashboard}>
                    <View style={styles.speedCircle}>
                        <Text style={styles.speedValue} allowFontScaling={false}>{speed}</Text>
                        <Text style={styles.speedUnit}>KM/H</Text>
                    </View>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.mapButton}
                        onPress={() => navigation.navigate('Main', { screen: 'Map' })}
                        activeOpacity={0.8}
                        testID="map-button"
                    >
                        <Map size={24} color={theme.colors.black} />
                        <Text style={styles.mapButtonText}>OPEN MAP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.reportButton}
                        onPress={handleReportBlitz}
                        activeOpacity={0.8}
                        testID="report-blitz-button"
                    >
                        <AlertTriangle size={32} color={theme.colors.white} />
                        <Text style={styles.reportButtonText}>REPORT BLITZ</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    closeButton: {
        padding: 8,
    },
    headerTitle: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        letterSpacing: 2,
    },
    headerRight: {
        width: 48,
    },
    dashboard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    speedCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 8,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    speedValue: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 84,
        lineHeight: 90,
    },
    speedUnit: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 24,
        letterSpacing: 2,
    },
    actions: { gap: 20 },
    mapButton: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 8,
        gap: 12,
    },
    mapButtonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        letterSpacing: 1,
    },
    reportButton: {
        backgroundColor: theme.colors.error,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 8,
        gap: 12,
        shadowColor: theme.colors.error,
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 10,
    },
    reportButtonText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 22,
        letterSpacing: 1,
    },
});
