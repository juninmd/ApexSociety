import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Trophy, AlertTriangle } from 'lucide-react-native';
import { theme } from '../theme';
import { Crew } from '../types';

interface LeaderboardCrewInfoProps {
    crew: Crew;
    isBountyTarget: boolean;
    filter: 'members' | 'heat' | 'notoriety';
}

export default function LeaderboardCrewInfo({
    crew,
    isBountyTarget,
    filter,
}: LeaderboardCrewInfoProps) {
    return (
        <View style={styles.memberInfo}>
            {isBountyTarget && (
                <TouchableOpacity
                    style={styles.bountyButton}
                    onPress={() =>
                        Alert.alert(
                            'Bounty Claimed',
                            `You have challenged ${crew.name} for the bounty!`,
                        )
                    }
                >
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
    );
}

const styles = StyleSheet.create({
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
