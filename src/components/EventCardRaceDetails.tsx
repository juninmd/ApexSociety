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

    // Determine win probability based on risk
    const winProbability = riskLevel === 'high' ? '35%' : riskLevel === 'medium' ? '55%' : '85%';
    const winProbColor = riskLevel === 'high' ? styles.riskHigh : riskLevel === 'medium' ? styles.riskMedium : styles.riskLow;

    return (
        <View style={styles.raceDetails}>
            <View style={styles.badgesContainer}>
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
            <View style={styles.probabilityBadge}>
                <Text style={styles.probabilityLabel}>CHANCES DE VITÓRIA:</Text>
                <Text style={[styles.probabilityValue, winProbColor]}>{winProbability}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    raceDetails: {
        marginBottom: 15,
        gap: 10,
    },
    badgesContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    riskBadge: {
        flexDirection: 'row',
        backgroundColor: theme.colors.border,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignItems: 'center',
    },
    riskLabel: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        marginRight: 4,
    },
    riskValue: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
    },
    riskHigh: { color: theme.colors.error },
    riskMedium: { color: '#FFAA00' },
    riskLow: { color: theme.colors.success },
    prizeBadge: {
        flexDirection: 'row',
        backgroundColor: theme.colors.border,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignItems: 'center',
    },
    prizeLabel: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        marginRight: 4,
    },
    prizeValue: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
    },
    probabilityBadge: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignSelf: 'flex-start',
    },
    probabilityLabel: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        marginRight: 6,
    },
    probabilityValue: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 12,
    },
});
