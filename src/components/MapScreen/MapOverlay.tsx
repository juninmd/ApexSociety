import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ReportHazardButton from '../ReportHazardButton';
import EventCardOverlay from '../EventCardOverlay';
import { theme } from '../../theme';
import { Event } from '../../types';
import { useHazards } from '../../context/HazardContext';

interface MapOverlayProps {
    nextEvent?: Event;
    nextEventHost: string;
}

export default function MapOverlay({ nextEvent, nextEventHost }: MapOverlayProps) {
    const { heatLevel } = useHazards();
    const [pulseAnim] = useState(() => new Animated.Value(0));

    useEffect(() => {
        if (heatLevel > 1) {
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
});
