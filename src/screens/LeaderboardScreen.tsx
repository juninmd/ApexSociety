import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';

export default function LeaderboardScreen() {
    const [filter, setFilter] = useState<'members' | 'heat'>('members');

    const sortedCrews = [...MOCK_CREWS].sort((a, b) => {
        if (filter === 'heat') {
            return (b.heatScore || 0) - (a.heatScore || 0);
        }
        return b.memberCount - a.memberCount;
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Trophy color={theme.colors.primary} size={40} />
                <Text style={styles.headerTitle}>LEADERBOARD</Text>

                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'members' && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter('members')}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === 'members' && styles.filterTextActive,
                            ]}
                        >
                            MOST MEMBERS
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'heat' && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter('heat')}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === 'heat' && styles.filterTextActive,
                            ]}
                        >
                            MOST WANTED
                        </Text>
                    </TouchableOpacity>
                </View>
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
                            {filter === 'members' ? (
                                <>
                                    <Text style={styles.memberCount}>{crew.memberCount}</Text>
                                    <Text style={styles.memberLabel}>MEMBERS</Text>
                                </>
                            ) : (
                                <View style={styles.heatInfo}>
                                    <Trophy
                                        color={theme.colors.error}
                                        size={14}
                                        style={{ marginRight: 4 }}
                                    />
                                    <View>
                                        <Text
                                            style={[
                                                styles.memberCount,
                                                { color: theme.colors.error },
                                            ]}
                                        >
                                            {crew.heatScore}
                                        </Text>
                                        <Text style={styles.memberLabel}>HEAT</Text>
                                    </View>
                                </View>
                            )}
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
    filterContainer: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: theme.colors.card,
        borderRadius: 8,
        padding: 4,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    filterButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    filterText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    filterTextActive: {
        color: theme.colors.black,
    },
    heatInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
