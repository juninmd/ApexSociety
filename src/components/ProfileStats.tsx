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
});
