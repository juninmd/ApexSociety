import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { theme } from '../theme';
import { Crew } from '../types';

interface LeaderboardCrewCardProps {
    crew: Crew;
    index: number;
    filter: 'members' | 'heat';
}

export default function LeaderboardCrewCard({ crew, index, filter }: LeaderboardCrewCardProps) {
    return (
        <View style={styles.crewCard}>
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
                        <Trophy color={theme.colors.error} size={14} style={{ marginRight: 4 }} />
                        <View>
                            <Text style={[styles.memberCount, { color: theme.colors.error }]}>
                                {crew.heatScore}
                            </Text>
                            <Text style={styles.memberLabel}>HEAT</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    heatInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
