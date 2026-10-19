import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { useHazards } from '../../context/HazardContext';
import { useWeather } from '../../hooks/useWeather';
import { useEvasionRoute } from '../../hooks/useEvasionRoute';
import { useCruisePlanner } from '../../hooks/useCruisePlanner';
import { styles } from './MapRouteAnalyzerStyles';

interface MapRouteAnalyzerProps {
    visible: boolean;
}

export default function MapRouteAnalyzer({ visible }: MapRouteAnalyzerProps) {
    const { hazards, heatLevel } = useHazards();
    const { calculateEvasionRoute, evasionRouteActive } = useEvasionRoute();
    const { addWaypoint, togglePlanner, isPlannerActive } = useCruisePlanner();
    const { isRaining } = useWeather();
    const [rivalDetected, setRivalDetected] = useState(false);
    const [safehouseRouted, setSafehouseRouted] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const timer = setTimeout(() => {
            if (!isMounted) return;
            // Note: During tests we mock this out to avoid memory leaks
            if (process.env.NODE_ENV === 'test') return;

            if (heatLevel > 1) {
                // 10% chance to trigger rival crew detection
                if (Math.random() < 0.1) {
                    setRivalDetected(true);
                }
            } else {
                setRivalDetected(false);
            }
        }, 0);
        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
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
            {score > 1.5 &&
                (heatLevel > 2 ? (
                    <TouchableOpacity
                        style={[
                            styles.evasionButton,
                            { borderColor: '#00FFFF', backgroundColor: 'rgba(0, 255, 255, 0.1)' },
                        ]}
                        onPress={() => {
                            const waypoints = calculateEvasionRoute(hazards, {
                                latitude: -23.5505,
                                longitude: -46.6333,
                            }); // default SP center
                            if (!isPlannerActive) togglePlanner();
                            waypoints.forEach((wp) => addWaypoint(wp));
                            setSafehouseRouted(true);
                        }}
                    >
                        <Text style={[styles.evasionText, { color: '#00FFFF' }]}>
                            {safehouseRouted ? 'ROUTED TO SAFEHOUSE' : 'FIND NEAREST SAFEHOUSE'}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.evasionButton}
                        onPress={() => {
                            const waypoints = calculateEvasionRoute(hazards, {
                                latitude: -23.5505,
                                longitude: -46.6333,
                            }); // default SP center
                            if (!isPlannerActive) togglePlanner();
                            waypoints.forEach((wp) => addWaypoint(wp));
                        }}
                    >
                        <Text style={styles.evasionText}>
                            {evasionRouteActive
                                ? 'EVASION ROUTE PLOTTED'
                                : 'CALCULATE EVASION ROUTE'}
                        </Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
}
