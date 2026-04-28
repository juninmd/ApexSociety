import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface EventCardRaceDetailsProps {
    riskLevel?: 'low' | 'medium' | 'high';
    prize?: string;
}

export default function EventCardRaceDetails({ riskLevel, prize }: EventCardRaceDetailsProps) {
    if (!riskLevel && !prize) {
        return null;
    }

    return (
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
                        {riskLevel === 'high' ? 'ALTO' : riskLevel === 'medium' ? 'MÉDIO' : 'BAIXO'}
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
    );
}

const styles = StyleSheet.create({
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
});
