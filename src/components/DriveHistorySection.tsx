import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../theme';
import { DriveRun } from '../context/DriveHistoryContext';
import { BarChart2, Zap } from 'lucide-react-native';
import DriveHistoryChart from './DriveHistoryChart';

interface DriveHistorySectionProps {
    runs: DriveRun[];
}

export default function DriveHistorySection({ runs }: DriveHistorySectionProps) {
    const [expandedRunId, setExpandedRunId] = useState<string | null>(null);

    if (runs.length === 0) {
        return null;
    }

    const toggleRun = (id: string) => {
        setExpandedRunId(expandedRunId === id ? null : id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>HISTÓRICO DE CORRIDAS (TELEMETRY)</Text>
            {runs.map((run) => {
                const dateObj = new Date(run.date);
                const dateStr = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
                const isExpanded = expandedRunId === run.id;

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

                        <TouchableOpacity
                            style={styles.analyzeBtn}
                            onPress={() => toggleRun(run.id)}
                        >
                            <BarChart2 color={theme.colors.primary} size={16} />
                            <Text style={styles.analyzeBtnText}>
                                {isExpanded ? 'CLOSE GHOST DATA' : 'ANALYZE GHOST DATA'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.challengeBtn}
                            onPress={() =>
                                Alert.alert(
                                    'Challenge Started',
                                    'You are now racing against the ghost run data.',
                                )
                            }
                        >
                            <Zap color={theme.colors.black} size={16} />
                            <Text style={styles.challengeBtnText}>CHALLENGE GHOST</Text>
                        </TouchableOpacity>

                        {isExpanded && <DriveHistoryChart run={run} />}
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
    analyzeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    analyzeBtnText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 8,
    },
    challengeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
    },
    challengeBtnText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 8,
    },
});
