import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface StatsProps {
    stats: {
        followers: string;
        following: string;
        reputation: string;
    };
}

export default function ProfileStats({ stats }: StatsProps) {
    const repValue = parseInt(stats.reputation.replace(/[^0-9]/g, ''), 10) || 0;

    let repBadge = 'ROOKIE';
    let badgeColor = theme.colors.secondary;

    if (repValue > 500) {
        repBadge = 'STREET LEGEND';
        badgeColor = theme.colors.primary; // Yellow / Gold
    } else if (repValue > 450) {
        repBadge = 'PRO TUNER';
        badgeColor = '#00F0FF'; // Cyan
    } else if (repValue > 420) {
        repBadge = 'NIGHT RIDER';
        badgeColor = '#FF0055'; // Pink/Red
    }

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.followers}</Text>
                <Text style={styles.statLabel}>FOLLOWERS</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.following}</Text>
                <Text style={styles.statLabel}>FOLLOWING</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.reputation}</Text>
                <Text style={styles.statLabel}>REPUTATION</Text>
                <View style={[styles.badgeContainer, { borderColor: badgeColor }]}>
                    <Text style={[styles.badgeText, { color: badgeColor }]}>{repBadge}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 0,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.text,
    },
    statLabel: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        color: theme.colors.secondary,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        backgroundColor: theme.colors.border,
    },
    badgeContainer: {
        marginTop: 5,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    badgeText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 9,
    },
});
