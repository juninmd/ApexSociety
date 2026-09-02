import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { DriveRun } from '../context/DriveHistoryContext';

interface DriveHistoryChartProps {
    run: DriveRun;
}

export default function DriveHistoryChart({ run }: DriveHistoryChartProps) {
    return (
        <View style={styles.chartContainer}>
            {/* Mock Chart utilizing flex widths based on values */}
            <View style={styles.chartBarWrapper}>
                <Text style={styles.chartLabel}>SPEED</Text>
                <View style={styles.chartBarBg}>
                    <View
                        style={[
                            styles.chartBarFill,
                            {
                                width: `${Math.min((run.maxSpeed / 300) * 100, 100)}%`,
                                backgroundColor: theme.colors.primary,
                            },
                        ]}
                    />
                </View>
            </View>
            <View style={styles.chartBarWrapper}>
                <Text style={styles.chartLabel}>RPM</Text>
                <View style={styles.chartBarBg}>
                    <View
                        style={[
                            styles.chartBarFill,
                            {
                                width: `${Math.min((run.maxRpm / 9000) * 100, 100)}%`,
                                backgroundColor: theme.colors.error,
                            },
                        ]}
                    />
                </View>
            </View>
            <View style={styles.chartBarWrapper}>
                <Text style={styles.chartLabel}>BOOST</Text>
                <View style={styles.chartBarBg}>
                    <View
                        style={[
                            styles.chartBarFill,
                            {
                                width: `${Math.min((run.maxBoost / 3.0) * 100, 100)}%`,
                                backgroundColor: theme.colors.secondary,
                            },
                        ]}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 15,
        backgroundColor: '#0a0a0a',
        padding: 10,
        borderRadius: 4,
    },
    chartBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    chartLabel: {
        width: 50,
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
    },
    chartBarBg: {
        flex: 1,
        height: 8,
        backgroundColor: '#222',
        borderRadius: 4,
        overflow: 'hidden',
    },
    chartBarFill: {
        height: '100%',
        borderRadius: 4,
    },
});
