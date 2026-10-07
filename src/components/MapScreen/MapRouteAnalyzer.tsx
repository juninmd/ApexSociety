import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { useHazards } from '../../context/HazardContext';
import { useWeather } from '../../hooks/useWeather';
import { useEvasionRoute } from '../../hooks/useEvasionRoute';
import { useCruisePlanner } from '../../hooks/useCruisePlanner';

interface MapRouteAnalyzerProps {
    visible: boolean;
}

export default function MapRouteAnalyzer({ visible }: MapRouteAnalyzerProps) {
    const { hazards, heatLevel } = useHazards();
    const { calculateEvasionRoute, evasionRouteActive } = useEvasionRoute();
    const { addWaypoint, togglePlanner, isPlannerActive } = useCruisePlanner();
    const { isRaining } = useWeather();
    const [rivalDetected, setRivalDetected] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (heatLevel > 1) {
                // 10% chance to trigger rival crew detection
                if (Math.random() < 0.1) {
                    setRivalDetected(true);
                }
            } else {
                setRivalDetected(false);
            }
        }, 0);
        return () => clearTimeout(timer);
    }, [heatLevel]);

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
            {rivalDetected && (
                <Text style={styles.warning}>CRITICAL: RIVAL CREW DETECTED IN PROXIMITY!</Text>
            )}
            {score > 1.5 && (
                <TouchableOpacity
                    style={styles.evasionButton}
                    onPress={() => {
                        const waypoints = calculateEvasionRoute(hazards, { latitude: -23.5505, longitude: -46.6333 }); // default SP center
                        if (!isPlannerActive) togglePlanner();
                        waypoints.forEach(wp => addWaypoint(wp));
                    }}
                >
                    <Text style={styles.evasionText}>
                        {evasionRouteActive ? 'EVASION ROUTE PLOTTED' : 'CALCULATE EVASION ROUTE'}
                    </Text>
                </TouchableOpacity>
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
    evasionButton: {
        marginTop: 15,
        backgroundColor: 'rgba(211, 47, 47, 0.2)',
        borderWidth: 1,
        borderColor: theme.colors.error,
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    evasionText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
    }
});
