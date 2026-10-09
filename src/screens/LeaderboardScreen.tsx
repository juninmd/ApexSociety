import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Trophy, Target } from 'lucide-react-native';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';
import LeaderboardCrewCard from '../components/LeaderboardCrewCard';
import { useReputation } from '../context/ReputationContext';

export default function LeaderboardScreen() {
    const [filter, setFilter] = useState<'members' | 'heat' | 'notoriety' | 'bounties'>('members');
    const { activeBounties, claimBounty } = useReputation();

    const sortedCrews = [...MOCK_CREWS].sort((a, b) => {
        if (filter === 'heat') {
            return (b.heatScore || 0) - (a.heatScore || 0);
        }
        if (filter === 'notoriety') {
            return (b.notoriety || 0) - (a.notoriety || 0);
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
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'notoriety' && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter('notoriety')}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === 'notoriety' && styles.filterTextActive,
                            ]}
                        >
                            NOTORIETY
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'bounties' && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter('bounties')}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === 'bounties' && styles.filterTextActive,
                            ]}
                        >
                            BOUNTIES
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.list}>
                {filter === 'bounties' ? (
                    activeBounties.map((bounty) => (
                        <View key={bounty.id} style={styles.bountyCard}>
                            <View style={styles.bountyHeader}>
                                <Target color={theme.colors.error} size={24} />
                                <Text style={styles.bountyTarget}>{bounty.targetUsername}</Text>
                            </View>
                            <Text style={styles.bountyAmount}>{bounty.amount} REP</Text>
                            <Text style={styles.bountyPlacedBy}>Placed by: {bounty.placedBy}</Text>
                            <TouchableOpacity
                                style={styles.claimButton}
                                onPress={() => claimBounty(bounty.id)}
                            >
                                <Text style={styles.claimButtonText}>CLAIM BOUNTY</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    sortedCrews.map((crew, index) => (
                        <LeaderboardCrewCard key={crew.id} crew={crew} index={index} filter={filter} />
                    ))
                )}
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
    bountyCard: {
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.error,
        marginBottom: 15,
    },
    bountyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    bountyTarget: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 18,
        color: theme.colors.text,
        marginLeft: 10,
    },
    bountyAmount: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        color: theme.colors.primary,
        marginBottom: 5,
    },
    bountyPlacedBy: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 15,
    },
    claimButton: {
        backgroundColor: theme.colors.error,
        paddingVertical: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    claimButtonText: {
        fontFamily: theme.fonts.primary.bold,
        color: theme.colors.white,
        fontSize: 14,
    },
});
