import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { useHazards } from '../../context/HazardContext';
import { useWeather } from '../../hooks/useWeather';

interface MapRouteAnalyzerProps {
    visible: boolean;
}

export default function MapRouteAnalyzer({ visible }: MapRouteAnalyzerProps) {
    const { heatLevel } = useHazards();
    const { isRaining } = useWeather();

    if (!visible) return null;

    let score = 1.0;
    if (heatLevel > 0) score += 0.5 * heatLevel;
    if (isRaining) score += 1.0;

    let riskText = 'LOW RISK';
    if (score > 2.5) {
        riskText = 'EXTREME RISK';
    } else if (score > 1.5) {
        riskText = 'HIGH RISK';
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AI ROUTE ANALYZER</Text>
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>ROUTE SCORE</Text>
                    <Text style={styles.statValue}>{score.toFixed(1)}x</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>STATUS</Text>
                    <Text
                        style={[
                            styles.statValue,
                            { color: score > 1.5 ? theme.colors.error : theme.colors.primary },
                        ]}
                    >
                        {riskText}
                    </Text>
                </View>
            </View>
            {(heatLevel > 0 || isRaining) && (
                <Text style={styles.warning}>
                    Warning: Active hazards or poor weather detected on route.
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 130, // Below top controls
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        zIndex: 10,
    },
    title: {
        fontFamily: theme.fonts.primary.bold,
        color: theme.colors.primary,
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statBox: {
        alignItems: 'center',
    },
    statLabel: {
        fontFamily: theme.fonts.secondary.regular,
        color: theme.colors.textSecondary,
        fontSize: 10,
        marginBottom: 4,
    },
    statValue: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.text,
        fontSize: 16,
    },
    warning: {
        fontFamily: theme.fonts.secondary.regular,
        color: theme.colors.error,
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
    },
});
