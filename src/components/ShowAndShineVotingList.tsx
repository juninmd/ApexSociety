import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../theme';
import CustomButton from './CustomButton';

interface ShowAndShineVotingListProps {
    entries: { id: string; owner: string; car: string }[];
    selectedCategory: string | null;
    votes: Record<string, string>;
    onVote: (carId: string) => void;
}

export default function ShowAndShineVotingList({
    entries,
    selectedCategory,
    votes,
    onVote,
}: ShowAndShineVotingListProps) {
    return (
        <ScrollView style={styles.entriesList}>
            {entries.map((entry) => (
                <View key={entry.id} style={styles.entryCard}>
                    <View style={styles.entryInfo}>
                        <Text style={styles.entryCar}>{entry.car}</Text>
                        <Text style={styles.entryOwner}>{entry.owner}</Text>
                    </View>
                    <CustomButton
                        title={votes[selectedCategory || ''] === entry.id ? 'VOTADO' : 'VOTAR'}
                        onPress={() => onVote(entry.id)}
                        variant={
                            votes[selectedCategory || ''] === entry.id ? 'secondary' : 'primary'
                        }
                        style={styles.voteButton}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    entriesList: {
        flex: 1,
    },
    entryCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 10,
        borderRadius: 8,
    },
    entryInfo: {
        flex: 1,
    },
    entryCar: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
    },
    entryOwner: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginTop: 4,
    },
    voteButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
});
