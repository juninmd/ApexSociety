import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Eye } from 'lucide-react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';

export default function ScoutScoreBadge() {
    const { scoutScore } = useReputation();

    if (scoutScore === 0) return null;

    return (
        <View style={styles.container}>
            <Eye size={14} color={theme.colors.black} />
            <Text style={styles.text}>SCOUT: {scoutScore}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginTop: 10,
        gap: 6,
    },
    text: {
        color: theme.colors.black,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
    },
});
