import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface EventTypeSelectorProps {
    eventType: 'meet' | 'race' | 'checkpoint';
    setEventType: (type: 'meet' | 'race' | 'checkpoint') => void;
}

export default function EventTypeSelector({ eventType, setEventType }: EventTypeSelectorProps) {
    return (
        <View style={styles.typeSelectorContainer}>
            <Text style={styles.typeLabel}>EVENT TYPE</Text>
            <View style={styles.typeSelector}>
                {(['meet', 'race', 'checkpoint'] as const).map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[styles.typeButton, eventType === type && styles.typeButtonActive]}
                        onPress={() => setEventType(type)}
                    >
                        <Text
                            style={[
                                styles.typeButtonText,
                                eventType === type && styles.typeButtonTextActive,
                            ]}
                        >
                            {type.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    typeSelectorContainer: {
        marginBottom: 20,
    },
    typeLabel: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        letterSpacing: 1,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 10,
    },
    typeButton: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
        backgroundColor: theme.colors.card,
    },
    typeButtonActive: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
    },
    typeButtonText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    typeButtonTextActive: {
        color: theme.colors.black,
    },
});
