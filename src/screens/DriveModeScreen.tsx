import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import ReportHazardButton from '../components/ReportHazardButton';
import { useHazards } from '../context/HazardContext';
import { useAlert } from '../context/AlertContext';
import Speedometer from '../components/Speedometer';
import RadarStatus from '../components/RadarStatus';
import DriveModeTopBar from '../components/DriveModeTopBar';
import { useDriveTracking } from '../hooks/useDriveTracking';

export default function DriveModeScreen() {
    const [pulseAnim] = useState(() => new Animated.Value(1));
    const { hazards, heatLevel } = useHazards();
    const { showAlert } = useAlert();

    const { speed, isGhostMode, handleToggleGhostMode } = useDriveTracking({
        hazards,
        showAlert,
    });

    useEffect(() => {
        if (speed > 100) {
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            ]).start();
        }
    }, [speed, pulseAnim]);

    const isHighSpeed = speed > 100;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={isGhostMode ? ['#0d0d1a', '#000000'] : ['#1a1a1a', '#000000']}
                style={styles.gradient}
            >
                <DriveModeTopBar
                    isGhostMode={isGhostMode}
                    onToggleGhostMode={handleToggleGhostMode}
                    heatLevel={heatLevel}
                />
                <View style={styles.content}>
                    <RadarStatus isHighSpeed={isHighSpeed} />
                    <Speedometer speed={speed} pulseAnim={pulseAnim} isHighSpeed={isHighSpeed} />

                    <View style={styles.actionsContainer}>
                        <ReportHazardButton type="blitz" />
                        <ReportHazardButton type="radar" />
                        <ReportHazardButton type="acidente" />
                        <ReportHazardButton type="sos" />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.black },
    gradient: { flex: 1 },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 60,
    },
    actionsContainer: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
