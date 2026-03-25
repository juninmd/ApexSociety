import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EventCardBadgesProps {
    isPrivate?: boolean;
    eventType?: 'meet' | 'race' | 'checkpoint';
}

export default function EventCardBadges({ isPrivate, eventType }: EventCardBadgesProps) {
    if (!eventType && !isPrivate) return null;

    return (
        <View style={styles.badgesContainer}>
            {eventType && (
                <View
                    style={[
                        styles.typeBadge,
                        eventType === 'checkpoint' && styles.checkpointBadge,
                        eventType === 'race' && styles.raceBadge,
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
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: '#0000FF',
    },
    raceBadge: {
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
});
