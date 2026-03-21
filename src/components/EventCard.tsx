import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Users, Clock } from 'lucide-react-native';

interface EventCardProps {
    title: string;
    host: string;
    location: string;
    time: string;
    attendees: number;
    isPrivate?: boolean;
    eventType?: string;
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
    onPress,
}: EventCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.header}>
                <Text style={styles.host}>HOSTED BY {host}</Text>
                <View style={styles.badgesContainer}>
                    {eventType && (
                        <View
                            style={[
                                styles.typeBadge,
                                eventType === 'checkpoint' && styles.checkpointBadge,
                            ]}
                        >
                            <Text style={styles.typeText}>{eventType.toUpperCase()}</Text>
                        </View>
                    )}
                    {isPrivate && (
                        <View style={styles.privateBadge}>
                            <Text style={styles.privateText}>PRIVATE</Text>
                        </View>
                    )}
                </View>
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
        fontFamily: 'Roboto_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    badgesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    typeBadge: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 2,
    },
    checkpointBadge: {
        backgroundColor: '#FF3333',
    },
    typeText: {
        color: '#000',
        fontSize: 8,
        fontFamily: 'Roboto_700Bold',
    },
    privateBadge: {
        backgroundColor: '#333',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 2,
    },
    privateText: {
        color: '#AAA',
        fontSize: 8,
        fontFamily: 'Roboto_700Bold',
    },
    title: {
        color: '#FFF',
        fontFamily: 'Oswald_700Bold',
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
        fontFamily: 'Roboto_400Regular',
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
        fontFamily: 'Roboto_700Bold',
        fontSize: 12,
        marginLeft: 6,
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
