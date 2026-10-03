import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ReportHazardButton from '../ReportHazardButton';
import EventCardOverlay from '../EventCardOverlay';
import { theme } from '../../theme';
import { Event } from '../../types';
import { useHazards } from '../../context/HazardContext';
import { useTurf } from '../../context/TurfContext';
import { MOCK_USERS } from '../../data/mock';
import { getDistance } from '../../utils/location';

interface MapOverlayProps {
    nextEvent?: Event;
    nextEventHost: string;
}

export default function MapOverlay({ nextEvent, nextEventHost }: MapOverlayProps) {
    const { heatLevel } = useHazards();
    const { territories } = useTurf();
    const [pulseAnim] = useState(() => new Animated.Value(0));

    // Check for turf intrusions (rival crew member in turf)
    const hasTurfIntrusion = territories.some((territory) => {
        return MOCK_USERS.some((user) => {
            if (user.crewId !== territory.crewId) {
                const distKm = getDistance(
                    territory.center.latitude,
                    territory.center.longitude,
                    user.location.latitude,
                    user.location.longitude,
                );
                if (distKm <= territory.radius / 1000) return true;
            }
            return false;
        });
    });

    useEffect(() => {
        if (heatLevel > 1 || hasTurfIntrusion) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        } else {
            pulseAnim.setValue(0);
            pulseAnim.stopAnimation();
        }
    }, [heatLevel, pulseAnim]);

    return (
        <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)']} style={styles.overlay}>
            {heatLevel > 1 && (
                <Animated.View
                    style={[styles.heatOverlay, { opacity: pulseAnim }]}
                    pointerEvents="none"
                />
            )}
            {hasTurfIntrusion && (
                <View style={styles.intrusionBanner}>
                    <Text style={styles.intrusionText}>RIVAL CREW INTRUSION DETECTED</Text>
                </View>
            )}
            <View style={styles.topOverlay}>
                <View style={styles.actionsContainer}>
                    <ReportHazardButton type="blitz" />
                    <ReportHazardButton type="radar" />
                    <ReportHazardButton type="acidente" />
                </View>
                <View>
                    <Text style={styles.timeText}>00:13</Text>
                    <Text style={styles.speedText}>1 KM/H</Text>
                </View>
            </View>

            {nextEvent && <EventCardOverlay nextEvent={nextEvent} nextEventHost={nextEventHost} />}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 60,
        paddingBottom: 100,
        pointerEvents: 'box-none',
    },
    timeText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        textAlign: 'right',
    },
    speedText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 18,
        textAlign: 'right',
    },
    topOverlay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    actionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        maxWidth: '70%',
    },
    heatOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
    },
    intrusionBanner: {
        position: 'absolute',
        top: '40%',
        left: 0,
        right: 0,
        backgroundColor: 'rgba(211, 47, 47, 0.8)',
        padding: 10,
        alignItems: 'center',
        zIndex: 100,
    },
    intrusionText: {
        color: '#FFF',
        fontFamily: theme.fonts.primary.bold,
        fontSize: 20,
        letterSpacing: 2,
    },
});
