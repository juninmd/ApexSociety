import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import CustomButton from '../components/CustomButton';
import { useAlert } from '../context/AlertContext';

export default function DriveModeScreen() {
    const { showAlert } = useAlert();
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            );
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleReportBlitz = () => {
        showAlert('Blitz reportada! Alerta emitido para a rede ApexSociety.');
    };

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.card]}
            style={styles.container}
        >
            <View style={styles.topSection}>
                <Text style={styles.timeText}>{currentTime}</Text>
                <Text style={styles.speedLabel}>SPEED</Text>
                <Text style={styles.speedValue}>
                    85 <Text style={styles.speedUnit}>KM/H</Text>
                </Text>
            </View>

            <View style={styles.bottomSection}>
                <CustomButton
                    title="REPORT BLITZ / CHECKPOINT"
                    onPress={handleReportBlitz}
                    variant="primary"
                    style={styles.reportButton}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 40,
        backgroundColor: theme.colors.background,
    },
    topSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 32,
        marginBottom: 20,
    },
    speedLabel: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 24,
        opacity: 0.8,
        letterSpacing: 2,
    },
    speedValue: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 100,
        lineHeight: 120,
    },
    speedUnit: {
        fontSize: 32,
        color: theme.colors.text,
        opacity: 0.8,
    },
    bottomSection: {
        paddingBottom: 40,
    },
    reportButton: {
        backgroundColor: theme.colors.error,
        borderColor: theme.colors.error,
        height: 80,
    },
});
