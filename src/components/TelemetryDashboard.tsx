import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface TelemetryDashboardProps {
    speed: number;
}

export default function TelemetryDashboard({ speed }: TelemetryDashboardProps) {
    // Calculate telemetry directly during render to avoid cascading updates
    const rpm = Math.round(800 + Math.min(speed * 40, 7200)); // 8000 Max RPM approx
    const boost = Number((speed > 60 ? Math.min((speed - 60) * 0.2, 2.5) : 0).toFixed(1)); // Max 2.5 bar
    const temp = Math.round(90 + Math.min(speed * 0.1, 30)); // Max 120 C

    return (
        <View style={styles.container}>
            <View style={styles.metricCard}>
                <Text style={styles.value}>{boost.toFixed(1)}</Text>
                <Text style={styles.label}>BOOST (BAR)</Text>
            </View>
            <View style={styles.metricCard}>
                <Text style={[styles.value, rpm > 6500 && styles.warningText]}>{rpm}</Text>
                <Text style={styles.label}>RPM</Text>
            </View>
            <View style={styles.metricCard}>
                <Text style={[styles.value, temp > 110 && styles.dangerText]}>{temp}°</Text>
                <Text style={styles.label}>TEMP (C)</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    metricCard: {
        alignItems: 'center',
        flex: 1,
    },
    value: {
        color: theme.colors.white,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 22,
    },
    label: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        marginTop: 4,
        letterSpacing: 1,
    },
    warningText: {
        color: theme.colors.primary,
    },
    dangerText: {
        color: theme.colors.error,
    },
});
