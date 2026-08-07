import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';

export default function LeaderboardScreen() {
    const sortedCrews = [...MOCK_CREWS].sort((a, b) => b.memberCount - a.memberCount);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Trophy color={theme.colors.primary} size={40} />
                <Text style={styles.headerTitle}>LEADERBOARD</Text>
            </View>

            <View style={styles.list}>
                {sortedCrews.map((crew, index) => (
                    <View key={crew.id} style={styles.crewCard}>
                        <View style={styles.rankContainer}>
                            <Text style={styles.rankText}>#{index + 1}</Text>
                        </View>
                        <View style={styles.crewInfo}>
                            <Text style={styles.crewName}>{crew.name}</Text>
                            <Text style={styles.crewRank}>{crew.rank}</Text>
                        </View>
                        <View style={styles.memberInfo}>
                            <Text style={styles.memberCount}>{crew.memberCount}</Text>
                            <Text style={styles.memberLabel}>MEMBERS</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 28,
        color: theme.colors.text,
        marginTop: 10,
        letterSpacing: 2,
    },
    list: {
        padding: 20,
    },
    crewCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 20,
        color: theme.colors.primary,
    },
    crewInfo: {
        flex: 1,
        marginLeft: 15,
    },
    crewName: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.text,
    },
    crewRank: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: theme.colors.secondary,
        marginTop: 4,
    },
    memberInfo: {
        alignItems: 'flex-end',
    },
    memberCount: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 20,
        color: theme.colors.text,
    },
    memberLabel: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        color: theme.colors.secondary,
    },
});
