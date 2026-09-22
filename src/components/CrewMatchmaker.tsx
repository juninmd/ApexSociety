import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users, CheckCircle } from 'lucide-react-native';
import { theme } from '../theme';
import { useCrewMatchmaker } from '../hooks/useCrewMatchmaker';

export default function CrewMatchmaker() {
    const { recommendations } = useCrewMatchmaker();

    if (recommendations.length === 0) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Users color={theme.colors.primary} size={20} />
                <Text style={styles.title}>AI CREW MATCHMAKER</Text>
            </View>
            <Text style={styles.subtitle}>Recommended for your playstyle & rep:</Text>

            {recommendations.map((crew) => (
                <View key={crew.id} style={styles.crewCard}>
                    <View style={styles.crewHeader}>
                        <Text style={styles.crewName}>{crew.name}</Text>
                        <View style={styles.matchScoreBadge}>
                            <Text style={styles.matchScoreText}>{crew.matchScore}% MATCH</Text>
                        </View>
                    </View>
                    <Text style={styles.reasonText}>{crew.reason}</Text>
                    <TouchableOpacity style={styles.applyButton}>
                        <CheckCircle color={theme.colors.black} size={14} />
                        <Text style={styles.applyButtonText}>APPLY</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(20, 20, 20, 0.8)',
        borderRadius: 8,
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        gap: 8,
    },
    title: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        letterSpacing: 1,
    },
    subtitle: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginBottom: 15,
    },
    crewCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    crewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    crewName: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
        textTransform: 'uppercase',
    },
    matchScoreBadge: {
        backgroundColor: 'rgba(212, 175, 55, 0.15)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    matchScoreText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
    },
    reasonText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginBottom: 12,
        fontStyle: 'italic',
    },
    applyButton: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 4,
        gap: 6,
    },
    applyButtonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 12,
    },
});
