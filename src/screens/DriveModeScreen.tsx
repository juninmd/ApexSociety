import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import ReportHazardButton from '../components/ReportHazardButton';
import { useHazards } from '../context/HazardContext';
import { useAlert } from '../context/AlertContext';
import Speedometer from '../components/Speedometer';
import RadarStatus from '../components/RadarStatus';
import DriveModeTopBar from '../components/DriveModeTopBar';
import PanicButton from '../components/PanicButton';
import TelemetryDashboard from '../components/TelemetryDashboard';
import PitWallFeed from '../components/PitWallFeed';
import SpotterAssistant from '../components/SpotterAssistant';
import PoliceScannerFeed from '../components/PoliceScannerFeed';
import RouteThreatBanner from '../components/RouteThreatBanner';
import EBSFlare from '../components/EBSFlare';
import { useDriveTracking } from '../hooks/useDriveTracking';
import { useWeather } from '../hooks/useWeather';
import { useRouteThreat } from '../hooks/useRouteThreat';

export default function DriveModeScreen() {
    const [pulseAnim] = useState(() => new Animated.Value(1));
    const { hazards, heatLevel } = useHazards();
    const threatInfo = useRouteThreat();
    const { isRaining } = useWeather();
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
                {!isGhostMode && <PitWallFeed />}
                {isGhostMode && (
                    <View style={styles.ghostDecoyBanner}>
                        <Text style={styles.ghostDecoyText}>
                            GHOST DECOY ACTIVE - MOCKING LOCATION
                        </Text>
                    </View>
                )}
                <View style={styles.content}>
                    {!isGhostMode && <RouteThreatBanner threatInfo={threatInfo} />}
                    {!isGhostMode && <SpotterAssistant />}
                    <PoliceScannerFeed />
                    <RadarStatus isHighSpeed={isHighSpeed} />
                    <Speedometer speed={speed} pulseAnim={pulseAnim} isHighSpeed={isHighSpeed} />
                    <TelemetryDashboard speed={speed} isRaining={isRaining} />

                    <View style={styles.actionsContainer}>
                        <ReportHazardButton type="blitz" />
                        <ReportHazardButton type="radar" />
                        <ReportHazardButton type="acidente" />
                        <ReportHazardButton type="sos" />
                        <ReportHazardButton type="flare" />
                    </View>
                </View>
            </LinearGradient>
            <PanicButton />
            <EBSFlare />
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
    ghostDecoyBanner: {
        position: 'absolute',
        top: 100,
        width: '100%',
        alignItems: 'center',
        zIndex: 10,
    },
    ghostDecoyText: {
        color: '#00FFFF',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00FFFF',
    },
});
