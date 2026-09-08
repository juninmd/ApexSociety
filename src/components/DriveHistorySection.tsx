import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../theme';
import { DriveRun } from '../context/DriveHistoryContext';
import { BarChart2, Zap } from 'lucide-react-native';
import DriveHistoryChart from './DriveHistoryChart';

import { styles } from './DriveHistorySectionStyles';

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
