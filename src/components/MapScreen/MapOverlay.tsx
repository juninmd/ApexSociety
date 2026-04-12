import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ReportHazardButton from '../ReportHazardButton';
import EventCardOverlay from '../EventCardOverlay';
import { theme } from '../../theme';
import { Event } from '../../types';

interface MapOverlayProps {
    nextEvent?: Event;
    nextEventHost: string;
}

export default function MapOverlay({ nextEvent, nextEventHost }: MapOverlayProps) {
    return (
        <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)']} style={styles.overlay}>
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
});
