import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Vibration } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { theme } from '../theme';
import ReportHazardButton from '../components/ReportHazardButton';
import { useHazards } from '../context/HazardContext';
import { useAlert } from '../context/AlertContext';
import Speedometer from '../components/Speedometer';
import RadarStatus from '../components/RadarStatus';
import DriveModeTopBar from '../components/DriveModeTopBar';
import { getDistance } from '../utils/location';

export default function DriveModeScreen() {
    const [speed, setSpeed] = useState(0);
    const [pulseAnim] = useState(() => new Animated.Value(1));
    const [proximityAlert, setProximityAlert] = useState<string | null>(null);
    const [isGhostMode, setIsGhostMode] = useState(false);
    const { hazards, heatLevel } = useHazards();
    const { showAlert } = useAlert();

    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed((prev) => {
                const nextSpeed = prev + Math.floor(Math.random() * 5);
                if (nextSpeed > 140) return 130 + Math.floor(Math.random() * 10);
                return nextSpeed;
            });
        }, 300);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (speed > 100) {
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            ]).start();
        }
    }, [speed, pulseAnim]);

    useEffect(() => {
        let locationSub: Location.LocationSubscription | null = null;
        let isCancelled = false;

        const startLocationTracking = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted' || isCancelled) return;

            const sub = await Location.watchPositionAsync(
                { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
                (location) => {
                    if (isCancelled || isGhostMode) return;
                    const { latitude, longitude } = location.coords;

                    const nearbyHazard = hazards.find((hazard) => {
                        const dist = getDistance(
                            latitude,
                            longitude,
                            hazard.location.latitude,
                            hazard.location.longitude,
                        );
                        return dist < 2 && (hazard.type === 'blitz' || hazard.type === 'acidente');
                    });

                    if (nearbyHazard && proximityAlert !== nearbyHazard.id) {
                        const msg =
                            nearbyHazard.type === 'blitz'
                                ? 'ALERTA: BLITZ POLICIAL A MENOS DE 2KM!'
                                : 'ALERTA: ACIDENTE A MENOS DE 2KM!';
                        showAlert(msg);
                        setProximityAlert(nearbyHazard.id);
                        Vibration.vibrate([0, 500, 200, 500]); // Vibrate twice
                    } else if (!nearbyHazard) {
                        setProximityAlert(null);
                    }
                },
            );

            if (isCancelled) sub.remove();
            else locationSub = sub;
        };

        startLocationTracking();

        return () => {
            isCancelled = true;
            if (locationSub) locationSub.remove();
        };
    }, [hazards, proximityAlert, showAlert, isGhostMode]);

    const isHighSpeed = speed > 100;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={isGhostMode ? ['#0d0d1a', '#000000'] : ['#1a1a1a', '#000000']}
                style={styles.gradient}
            >
                <DriveModeTopBar
                    isGhostMode={isGhostMode}
                    onToggleGhostMode={() => setIsGhostMode(!isGhostMode)}
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
