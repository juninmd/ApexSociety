import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Users, Clock } from 'lucide-react-native';
import EventCardBadges from './EventCardBadges';
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
    onPress,
}: EventCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.header}>
                <Text style={styles.host}>HOSTED BY {host}</Text>
                <EventCardBadges isPrivate={isPrivate} eventType={eventType} />
            </View>

            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Clock size={14} color="#FFD700" />
                    <Text style={styles.infoText}>{time}</Text>
                </View>
                <View style={styles.infoItem}>
                    <MapPin size={14} color="#FFD700" />
                    <Text style={styles.infoText}>{location}</Text>
                </View>
            </View>

            {(riskLevel || prize) && (
                <View style={styles.raceDetails}>
                    {riskLevel && (
                        <View style={styles.riskBadge}>
                            <Text style={styles.riskLabel}>RISCO:</Text>
                            <Text
                                style={[
                                    styles.riskValue,
                                    riskLevel === 'high'
                                        ? styles.riskHigh
                                        : riskLevel === 'medium'
                                          ? styles.riskMedium
                                          : styles.riskLow,
                                ]}
                            >
                                {riskLevel === 'high'
                                    ? 'ALTO'
                                    : riskLevel === 'medium'
                                      ? 'MÉDIO'
                                      : 'BAIXO'}
                            </Text>
                        </View>
                    )}
                    {prize && (
                        <View style={styles.prizeBadge}>
                            <Text style={styles.prizeLabel}>PRÊMIO:</Text>
                            <Text style={styles.prizeValue}>{prize}</Text>
                        </View>
                    )}
                </View>
            )}

            <View style={styles.footer}>
                <Users size={14} color="#666" />
                <Text style={styles.attendees}>{attendees} GOING</Text>
            </View>

            {/* Decorative "Stitch" corner */}
            <View style={styles.cornerDecor} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        marginBottom: 15,
        borderLeftWidth: 3,
        borderLeftColor: '#FFD700',
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
        color: '#888',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        textTransform: 'uppercase',
    },
    title: {
        color: '#FFF',
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    infoRow: {
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    infoText: {
        color: '#CCC',
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        marginLeft: 8,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 10,
    },
    attendees: {
        color: '#666',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 6,
    },
    raceDetails: {
        flexDirection: 'row',
        marginBottom: 15,
        gap: 10,
    },
    riskBadge: {
        flexDirection: 'row',
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignItems: 'center',
    },
    riskLabel: {
        color: '#888',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        marginRight: 4,
    },
    riskValue: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
    },
    riskHigh: { color: '#FF3333' },
    riskMedium: { color: '#FFAA00' },
    riskLow: { color: '#00FF00' },
    prizeBadge: {
        flexDirection: 'row',
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignItems: 'center',
    },
    prizeLabel: {
        color: '#888',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        marginRight: 4,
    },
    prizeValue: {
        color: '#FFD700',
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
    },
    cornerDecor: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 20,
        height: 20,
        backgroundColor: '#FFD700',
        transform: [{ rotate: '45deg' }],
    },
});
