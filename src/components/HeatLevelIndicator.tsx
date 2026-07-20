import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { theme } from '../theme';

interface HeatLevelIndicatorProps {
    level: number;
}

export default function HeatLevelIndicator({ level }: HeatLevelIndicatorProps) {
    let color = theme.colors.success;
    let text = 'LOW';
    if (level > 2) {
        color = theme.colors.error;
        text = 'MAXIMUM';
    } else if (level > 0) {
        color = theme.colors.warning;
        text = 'MEDIUM';
    }

    return (
        <View style={styles.container}>
            <Flame size={24} color={color} />
            <View style={styles.textContainer}>
                <Text style={styles.label}>CITY HEAT</Text>
                <Text style={[styles.level, { color }]}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    textContainer: {
        marginLeft: 10,
    },
    label: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
    },
    level: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
    },
});
