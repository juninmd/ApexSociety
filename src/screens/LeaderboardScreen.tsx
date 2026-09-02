import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';
import LeaderboardCrewCard from '../components/LeaderboardCrewCard';

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
                    <LeaderboardCrewCard key={crew.id} crew={crew} index={index} filter={filter} />
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
});
