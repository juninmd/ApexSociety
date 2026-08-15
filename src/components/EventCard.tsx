import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EventCardBadges from './EventCardBadges';
import EventCardRaceDetails from './EventCardRaceDetails';
import EventCardSecret from './EventCardSecret';
import EventCardInfo from './EventCardInfo';
import EventCardFooter from './EventCardFooter';
import { theme } from '../theme';

interface EventCardProps {
    eventId: string;
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
    elevatedRisk?: boolean;
    hypeScore?: number;
    onPress?: () => void;
}

export default function EventCard({
    eventId,
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
    elevatedRisk,
    hypeScore = 0,
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

            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                {hypeScore >= 100 && (
                    <View style={styles.hypeBadge}>
                        <Text style={styles.hypeText}>🔥 HIGH HYPE</Text>
                    </View>
                )}
            </View>

            <EventCardInfo time={time} location={location} weather={weather} />

            {elevatedRisk && (
                <View style={styles.elevatedRiskContainer}>
                    <Text style={styles.elevatedRiskText}>⚠️ ELEVATED POLICE RISK</Text>
                </View>
            )}

            <EventCardRaceDetails riskLevel={riskLevel} prize={prize} />

            <EventCardFooter eventId={eventId} attendees={attendees} startTime={time} />

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
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        textTransform: 'uppercase',
        flex: 1,
        marginRight: 8,
    },
    hypeBadge: {
        backgroundColor: 'rgba(255, 100, 0, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FF6400',
    },
    hypeText: {
        color: '#FF6400',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
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
    elevatedRiskContainer: {
        backgroundColor: 'rgba(255, 0, 0, 0.15)',
        padding: 8,
        borderRadius: 4,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.error,
        alignItems: 'center',
    },
    elevatedRiskText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
    },
});
