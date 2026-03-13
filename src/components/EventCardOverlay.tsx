import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Event } from '../types';

interface EventCardOverlayProps {
    nextEvent: Event;
    nextEventHost: string;
}

export default function EventCardOverlay({ nextEvent, nextEventHost }: EventCardOverlayProps) {
    return (
        <View style={styles.eventCard}>
            <Text style={styles.eventHost}>{nextEventHost} ★</Text>
            <Text style={styles.eventTitle}>{nextEvent.title}</Text>
            <Text style={styles.eventTime}>{nextEvent.startTime}</Text>
            <Text style={styles.eventStatus}>
                {nextEvent.isPrivate ? 'PRIVATE' : 'PUBLIC'} • {nextEvent.attendees}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    eventCard: {
        alignSelf: 'flex-end',
        marginBottom: 40,
    },
    eventHost: {
        color: theme.colors.text,
        fontSize: 12,
        fontFamily: theme.fonts.secondary.bold,
        textAlign: 'right',
    },
    eventTitle: {
        color: theme.colors.text,
        fontSize: 32,
        fontFamily: theme.fonts.primary.bold,
        textAlign: 'right',
        textTransform: 'uppercase',
    },
    eventTime: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        fontFamily: theme.fonts.secondary.regular,
        textAlign: 'right',
    },
    eventStatus: {
        color: theme.colors.secondary,
        fontSize: 12,
        fontFamily: theme.fonts.secondary.bold,
        textAlign: 'right',
    },
});
