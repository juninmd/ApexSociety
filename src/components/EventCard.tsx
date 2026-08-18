import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EventCardBadges from './EventCardBadges';
import EventCardRaceDetails from './EventCardRaceDetails';
import EventCardSecret from './EventCardSecret';
import EventCardInfo from './EventCardInfo';
import EventCardFooter from './EventCardFooter';
import { styles } from './EventCardStyles';

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
                eventLocation={location}
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
