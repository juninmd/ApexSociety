import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { DriveRun } from '../context/DriveHistoryContext';

interface DriveHistorySectionProps {
    runs: DriveRun[];
}

export default function DriveHistorySection({ runs }: DriveHistorySectionProps) {
    if (runs.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>HISTÓRICO DE CORRIDAS (TELEMETRY)</Text>
            {runs.map((run) => {
                const dateObj = new Date(run.date);
                const dateStr = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;

                return (
                    <View key={run.id} style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.date}>{dateStr}</Text>
                        </View>
                        <View style={styles.statsRow}>
                            <View style={styles.stat}>
                                <Text style={styles.value}>{run.maxSpeed.toFixed(0)}</Text>
                                <Text style={styles.label}>KM/H MÁX</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.value}>{run.maxRpm}</Text>
                                <Text style={styles.label}>RPM MÁX</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.value}>{run.maxBoost.toFixed(1)}</Text>
                                <Text style={styles.label}>BOOST MÁX</Text>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        marginBottom: 15,
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
    },
    header: {
        marginBottom: 10,
    },
    date: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stat: {
        alignItems: 'center',
    },
    value: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
    },
    label: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        marginTop: 2,
    },
});
