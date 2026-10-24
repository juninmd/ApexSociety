import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import ReportHazardButton from '../components/ReportHazardButton';
import { useHazards } from '../context/HazardContext';
import { useUI } from '../context/UIContext';
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
import ConvoyChat from '../components/ConvoyChat';
import ChallengeRadar from '../components/ChallengeRadar';
import { useDriveTracking } from '../hooks/useDriveTracking';
import { useWeather } from '../hooks/useWeather';
import { useRouteThreat } from '../hooks/useRouteThreat';
import { useSlipstream } from '../hooks/useSlipstream';
import SlipstreamBanner from '../components/SlipstreamBanner';
import { usePerfectRoute } from '../hooks/usePerfectRoute';
import GhostRunnerBounty from '../components/GhostRunnerBounty';
import { Location } from '../types';

export default function DriveModeScreen() {
    const [pulseAnim] = useState(() => new Animated.Value(1));
    const { hazards, heatLevel } = useHazards();
    const threatInfo = useRouteThreat();
    const { isRaining } = useWeather();
    const { showAlert } = useUI();

    const { speed, isGhostMode, handleToggleGhostMode, location } = useDriveTracking({
        hazards,
        showAlert,
    });

    const { isDrafting } = useSlipstream(speed);

    useEffect(() => {
        if (speed > 100) {
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            ]).start();
        }
    }, [speed, pulseAnim]);

    const isHighSpeed = speed > 100;

    // We mock destination logic for the demo, calculating a route ahead
    const mockDestination = location
        ? {
              latitude: location.latitude + 0.05,
              longitude: location.longitude + 0.05,
          }
        : null;

    usePerfectRoute(location as Location, mockDestination as Location);

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
                    currentLocation={location as Location}
                />
                {!isGhostMode && <PitWallFeed />}
                <GhostRunnerBounty isGhostMode={isGhostMode} heatLevel={heatLevel} />
                <View style={styles.content}>
                    {!isGhostMode && <RouteThreatBanner threatInfo={threatInfo} />}
                    {!isGhostMode && <SlipstreamBanner isDrafting={isDrafting} />}

                    {/* Note: PerfectRouteVisualizer is designed for map views, but we can hook it up here for UI state if needed, or simply log it for now as part of the architecture evolution. */}
                    {!isGhostMode && <SpotterAssistant />}
                    {!isGhostMode && <ChallengeRadar />}
                    <PoliceScannerFeed />
                    <RadarStatus isHighSpeed={isHighSpeed} />
                    <Speedometer speed={speed} pulseAnim={pulseAnim} isHighSpeed={isHighSpeed} />
                    <TelemetryDashboard speed={speed} isRaining={isRaining} />

                    <ConvoyChat />

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
});
