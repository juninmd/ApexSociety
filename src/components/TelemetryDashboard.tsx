import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { useConvoy } from '../context/ConvoyContext';
import { useTelemetry } from '../hooks/useTelemetry';
import { useDriveHistory } from '../context/DriveHistoryContext';

interface TelemetryDashboardProps {
    speed: number;
    isRaining?: boolean;
}

export default function TelemetryDashboard({ speed, isRaining }: TelemetryDashboardProps) {
    const { isBroadcasting, toggleBroadcast } = useConvoy();
    const { rpm, boost, temp } = useTelemetry(speed);
    const { addRun } = useDriveHistory();

    const [isRecording, setIsRecording] = useState(false);
    const maxStats = useRef({ maxSpeed: 0, maxRpm: 0, maxBoost: 0 });

    useEffect(() => {
        if (isRecording) {
            if (speed > maxStats.current.maxSpeed) maxStats.current.maxSpeed = speed;
            if (rpm > maxStats.current.maxRpm) maxStats.current.maxRpm = rpm;
            if (boost > maxStats.current.maxBoost) maxStats.current.maxBoost = boost;
        }
    }, [speed, rpm, boost, isRecording]);

    const toggleRecording = () => {
        if (isRecording) {
            // Stop and save
            addRun({
                maxSpeed: maxStats.current.maxSpeed,
                maxRpm: maxStats.current.maxRpm,
                maxBoost: maxStats.current.maxBoost,
            });
            maxStats.current = { maxSpeed: 0, maxRpm: 0, maxBoost: 0 };
        }
        setIsRecording(!isRecording);
    };

    return (
        <View style={styles.wrapper}>
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
            {isRaining && (
                <View style={styles.weatherWarning}>
                    <Text style={styles.weatherWarningText}>ROAD SLIPPERY / GRIP REDUCED</Text>
                </View>
            )}

            <View style={styles.controlsContainer}>
                <TouchableOpacity
                    style={[styles.broadcastToggle, isBroadcasting && styles.broadcastActive]}
                    onPress={toggleBroadcast}
                >
                    <Text
                        style={[styles.broadcastText, isBroadcasting && styles.broadcastTextActive]}
                    >
                        {isBroadcasting ? 'BROADCAST: LIVE' : 'BROADCAST: OFF'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.broadcastToggle, isRecording && styles.recordingActive]}
                    onPress={toggleRecording}
                >
                    <Text style={[styles.broadcastText, isRecording && styles.recordingTextActive]}>
                        {isRecording ? 'STOP RECORDING' : 'RECORD RUN'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginVertical: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    weatherWarning: {
        marginTop: 10,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    weatherWarningText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        letterSpacing: 1,
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
    broadcastToggle: {
        marginTop: 15,
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
    },
    broadcastActive: {
        borderColor: theme.colors.error,
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
    broadcastText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        letterSpacing: 1,
    },
    broadcastTextActive: {
        color: theme.colors.error,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
        gap: 10,
    },
    recordingActive: {
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
    },
    recordingTextActive: {
        color: theme.colors.primary,
    },
});
