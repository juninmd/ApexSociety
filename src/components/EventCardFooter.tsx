import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';

interface EventCardFooterProps {
    attendees: number;
    startTime?: string;
    endTime?: string;
}

export default function EventCardFooter({ attendees, startTime }: EventCardFooterProps) {
    const [rsvp, setRsvp] = useState(false);
    const isLive = startTime?.toLowerCase() === 'agora' || false;
    const { addReputation } = useReputation();

    const handlePress = () => {
        if (!rsvp) {
            addReputation(isLive ? 20 : 10); // +20 for checking in live, +10 for standard RSVP
        }
        setRsvp(!rsvp);
    };

    return (
        <View style={styles.footer}>
            <View style={styles.attendeesContainer}>
                <Users size={14} color={theme.colors.secondary} />
                <Text style={styles.attendees}>{attendees + (rsvp ? 1 : 0)} GOING</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.rsvpButton,
                    isLive && styles.liveButton,
                    rsvp && !isLive && styles.rsvpButtonActive,
                ]}
                onPress={handlePress}
            >
                <Text
                    style={[
                        styles.rsvpText,
                        isLive && styles.liveText,
                        rsvp && !isLive && styles.rsvpTextActive,
                    ]}
                >
                    {isLive
                        ? rsvp
                            ? 'CHECKED-IN'
                            : 'CHECK-IN (LIVE)'
                        : rsvp
                          ? 'CONFIRMADO'
                          : 'PARTICIPAR'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: 10,
    },
    attendeesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attendees: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 6,
    },
    rsvpButton: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        transform: [{ skewX: '-10deg' }],
    },
    rsvpButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    rsvpText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
        transform: [{ skewX: '10deg' }],
    },
    rsvpTextActive: {
        color: theme.colors.black,
    },
    liveButton: {
        borderColor: theme.colors.error,
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
    liveText: {
        color: theme.colors.error,
    },
});
