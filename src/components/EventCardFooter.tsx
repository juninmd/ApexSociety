import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';
import { theme } from '../theme';

interface EventCardFooterProps {
    attendees: number;
}

export default function EventCardFooter({ attendees }: EventCardFooterProps) {
    const [rsvp, setRsvp] = useState(false);

    return (
        <View style={styles.footer}>
            <View style={styles.attendeesContainer}>
                <Users size={14} color={theme.colors.secondary} />
                <Text style={styles.attendees}>{attendees + (rsvp ? 1 : 0)} GOING</Text>
            </View>
            <TouchableOpacity
                style={[styles.rsvpButton, rsvp && styles.rsvpButtonActive]}
                onPress={() => setRsvp(!rsvp)}
            >
                <Text style={[styles.rsvpText, rsvp && styles.rsvpTextActive]}>
                    {rsvp ? 'CONFIRMADO' : 'PARTICIPAR'}
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
});
