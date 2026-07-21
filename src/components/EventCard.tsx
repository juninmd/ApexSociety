import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EventCardBadges from './EventCardBadges';
import EventCardRaceDetails from './EventCardRaceDetails';
import EventCardSecret from './EventCardSecret';
import EventCardInfo from './EventCardInfo';
import EventCardFooter from './EventCardFooter';
import { theme } from '../theme';

interface EventCardProps {
    title: string;
    host: string;
    location: string;
    time: string;
    attendees: number;
    isPrivate?: boolean;
    eventType?: 'meet' | 'race' | 'checkpoint';
    riskLevel?: 'low' | 'medium' | 'high';
    prize?: string;
    isSecret?: boolean;
    passcode?: string;
    weather?: 'clear' | 'rain' | 'fog';
    onPress?: () => void;
}

export default function EventCard({
    title,
    host,
    location,
    time,
    attendees,
    isPrivate,
    eventType,
    riskLevel,
    prize,
    isSecret,
    passcode,
    weather,
    onPress,
}: EventCardProps) {
    const [isUnlocked, setIsUnlocked] = React.useState(false);

    if (isSecret && !isUnlocked) {
        return (
            <EventCardSecret
                host={host}
                passcode={passcode}
                isPrivate={isPrivate}
                eventType={eventType}
                onUnlock={() => setIsUnlocked(true)}
            />
        );
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.header}>
                <Text style={styles.host}>HOSTED BY {host}</Text>
                <EventCardBadges isPrivate={isPrivate} eventType={eventType} />
            </View>

            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>

            <EventCardInfo time={time} location={location} weather={weather} />

            <EventCardRaceDetails riskLevel={riskLevel} prize={prize} />

            <EventCardFooter attendees={attendees} />

            {/* Decorative "Stitch" corner */}
            <View style={styles.cornerDecor} />
        </TouchableOpacity>
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
    title: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        marginBottom: 10,
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
