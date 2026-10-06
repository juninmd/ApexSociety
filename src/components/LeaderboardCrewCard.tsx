import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Skull } from 'lucide-react-native';
import { theme } from '../theme';
import { Crew } from '../types';
import { useReputation } from '../context/ReputationContext';
import LeaderboardCrewInfo from './LeaderboardCrewInfo';

interface LeaderboardCrewCardProps {
    crew: Crew;
    index: number;
    filter: 'members' | 'heat' | 'notoriety';
}

export default function LeaderboardCrewCard({ crew, index, filter }: LeaderboardCrewCardProps) {
    const isBountyTarget = index === 0 && filter === 'notoriety';
    const { nemesisId, toggleNemesis } = useReputation();
    const isNemesis = nemesisId === crew.id;

    return (
        <View
            style={[
                styles.crewCard,
                isBountyTarget && styles.bountyCard,
                isNemesis && styles.nemesisCard,
            ]}
        >
            <View style={styles.rankContainer}>
                <Text style={styles.rankText}>#{index + 1}</Text>
            </View>
            <View style={styles.crewInfo}>
                <Text style={styles.crewName}>{crew.name}</Text>
                <Text style={styles.crewRank}>{crew.rank}</Text>
                <TouchableOpacity
                    onPress={() => toggleNemesis(crew.id)}
                    style={styles.nemesisToggle}
                >
                    <Skull
                        color={isNemesis ? theme.colors.error : theme.colors.textSecondary}
                        size={14}
                    />
                    <Text style={[styles.nemesisText, isNemesis && { color: theme.colors.error }]}>
                        {isNemesis ? 'NEMESIS DECLARED' : 'DECLARE NEMESIS'}
                    </Text>
                </TouchableOpacity>
            </View>
            <LeaderboardCrewInfo crew={crew} filter={filter} isBountyTarget={isBountyTarget} />
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
    bountyCard: {
        borderColor: theme.colors.error,
        borderWidth: 2,
    },
    nemesisCard: {
        borderColor: theme.colors.error,
        borderWidth: 1,
        shadowColor: theme.colors.error,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    nemesisToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 4,
    },
    nemesisText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        color: theme.colors.textSecondary,
    },
});
