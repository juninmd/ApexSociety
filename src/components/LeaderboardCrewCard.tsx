import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Trophy, AlertTriangle } from 'lucide-react-native';
import { theme } from '../theme';
import { Crew } from '../types';

interface LeaderboardCrewCardProps {
    crew: Crew;
    index: number;
    filter: 'members' | 'heat' | 'notoriety';
}

export default function LeaderboardCrewCard({ crew, index, filter }: LeaderboardCrewCardProps) {
    const isBountyTarget = index === 0 && filter === 'notoriety';

    return (
        <View style={[styles.crewCard, isBountyTarget && styles.bountyCard]}>
            <View style={styles.rankContainer}>
                <Text style={styles.rankText}>#{index + 1}</Text>
            </View>
            <View style={styles.crewInfo}>
                <Text style={styles.crewName}>{crew.name}</Text>
                <Text style={styles.crewRank}>{crew.rank}</Text>
            </View>
            <View style={styles.memberInfo}>
                {isBountyTarget && (
                    <TouchableOpacity style={styles.bountyButton}>
                        <AlertTriangle
                            color={theme.colors.black}
                            size={12}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={styles.bountyButtonText}>CLAIM BOUNTY</Text>
                    </TouchableOpacity>
                )}
                {filter === 'members' ? (
                    <>
                        <Text style={styles.memberCount}>{crew.memberCount}</Text>
                        <Text style={styles.memberLabel}>MEMBERS</Text>
                    </>
                ) : filter === 'notoriety' ? (
                    <View style={styles.heatInfo}>
                        <AlertTriangle
                            color={theme.colors.error}
                            size={14}
                            style={{ marginRight: 4 }}
                        />
                        <View>
                            <Text style={[styles.memberCount, { color: theme.colors.error }]}>
                                {crew.notoriety || 0}
                            </Text>
                            <Text style={styles.memberLabel}>WANTED LEVEL</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.heatInfo}>
                        <Trophy color={theme.colors.error} size={14} style={{ marginRight: 4 }} />
                        <View>
                            <Text style={[styles.memberCount, { color: theme.colors.error }]}>
                                {crew.heatScore}
                            </Text>
                            <Text style={styles.memberLabel}>HEAT SCORE</Text>
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
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.primary,
    },
    crewInfo: {
        flex: 1,
        marginLeft: 15,
    },
    crewName: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4,
    },
    crewRank: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.secondary,
    },
    memberInfo: {
        alignItems: 'flex-end',
    },
    memberCount: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.text,
        textAlign: 'right',
    },
    memberLabel: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        color: theme.colors.textSecondary,
        textAlign: 'right',
    },
    heatInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bountyCard: {
        borderColor: theme.colors.error,
        borderWidth: 2,
    },
    bountyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.error,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 8,
    },
    bountyButtonText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
        color: theme.colors.black,
    },
});
