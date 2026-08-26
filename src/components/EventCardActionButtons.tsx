import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface EventCardActionButtonsProps {
    isLive: boolean;
    rsvp: boolean;
    onFastTrackPress: () => void;
    onRsvpPress: () => void;
}

export default function EventCardActionButtons({
    isLive,
    rsvp,
    onFastTrackPress,
    onRsvpPress,
}: EventCardActionButtonsProps) {
    return (
        <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.fastTrackButton} onPress={onFastTrackPress}>
                <Text style={styles.fastTrackText}>PASS</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.rsvpButton,
                    isLive && styles.liveButton,
                    rsvp && !isLive && styles.rsvpButtonActive,
                ]}
                onPress={onRsvpPress}
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
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fastTrackButton: {
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
        transform: [{ skewX: '-10deg' }],
    },
    fastTrackText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
        transform: [{ skewX: '10deg' }],
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
