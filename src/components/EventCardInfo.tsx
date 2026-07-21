import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Clock, Sun, CloudRain, CloudFog } from 'lucide-react-native';
import { theme } from '../theme';

interface EventCardInfoProps {
    time: string;
    location: string;
    weather?: 'clear' | 'rain' | 'fog';
}

export default function EventCardInfo({ time, location, weather }: EventCardInfoProps) {
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
            {weather && (
                <View style={styles.infoItem}>
                    {weather === 'clear' && <Sun size={14} color={theme.colors.primary} />}
                    {weather === 'rain' && <CloudRain size={14} color={theme.colors.primary} />}
                    {weather === 'fog' && <CloudFog size={14} color={theme.colors.primary} />}
                    <Text style={styles.infoText}>
                        {weather === 'clear' && 'TEMPO LIMPO'}
                        {weather === 'rain' && 'CHUVA'}
                        {weather === 'fog' && 'NEBLINA'}
                    </Text>
                </View>
            )}
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
