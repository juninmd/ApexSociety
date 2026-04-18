import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Users } from 'lucide-react-native';
import { theme } from '../theme';

interface CrewHeaderProps {
    name: string;
    memberCount: number;
    rank: string;
}

export default function CrewHeader({ name, memberCount, rank }: CrewHeaderProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <View style={styles.header}>
            <View style={styles.card}>
                <View style={styles.logoPlaceholder}>
                    <Text style={styles.logoText}>{getInitials(name)}</Text>
                </View>
                <Text style={styles.crewName}>{name}</Text>
                <View style={styles.statsRow}>
                    <Users color={theme.colors.secondary} size={14} />
                    <Text style={styles.statsText}>{memberCount} MEMBROS</Text>
                    <Text style={styles.rankText}>{rank}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.colors.card,
        width: '100%',
        padding: 30,
        borderRadius: 0,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderBottomWidth: 3,
        borderBottomColor: theme.colors.primary,
    },
    logoPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    logoText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 32,
        color: theme.colors.primary,
    },
    crewName: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statsText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.text,
        marginLeft: 5,
        marginRight: 15,
    },
    rankText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.primary,
    },
});
