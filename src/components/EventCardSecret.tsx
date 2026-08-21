import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventCardBadges from './EventCardBadges';
import EventCardSecretAction from './EventCardSecretAction';
import { theme } from '../theme';

interface EventCardSecretProps {
    host: string;
    eventLocation: string;
    passcode?: string;
    isPrivate?: boolean;
    eventType?: 'meet' | 'race' | 'checkpoint';
    onUnlock: () => void;
}

export default function EventCardSecret({
    host,
    passcode,
    isPrivate,
    eventType,
    onUnlock,
}: EventCardSecretProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.host}>HOSTED BY {host}</Text>
                <EventCardBadges isPrivate={isPrivate} eventType={eventType} />
            </View>
            <EventCardSecretAction passcode={passcode} onUnlock={onUnlock} />
            <View style={styles.cornerDecor} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        padding: 20,
        marginBottom: 15,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
        position: 'relative',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    host: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        textTransform: 'uppercase',
    },
    cornerDecor: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 20,
        height: 20,
        backgroundColor: theme.colors.primary,
        transform: [{ rotate: '45deg' }],
    },
});
