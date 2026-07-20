import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';
import { theme } from '../theme';

interface EventCardInfoProps {
    time: string;
    location: string;
}

export default function EventCardInfo({ time, location }: EventCardInfoProps) {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoItem}>
                <Clock size={14} color={theme.colors.primary} />
                <Text style={styles.infoText}>{time}</Text>
            </View>
            <View style={styles.infoItem}>
                <MapPin size={14} color={theme.colors.primary} />
                <Text style={styles.infoText}>{location}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoRow: {
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    infoText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        marginLeft: 8,
    },
});
