import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import FormInput from './FormInput';

interface CreateEventRiskSelectorProps {
    riskLevel: 'low' | 'medium' | 'high';
    setRiskLevel: (level: 'low' | 'medium' | 'high') => void;
    prize: string;
    setPrize: (prize: string) => void;
}

export default function CreateEventRiskSelector({
    riskLevel,
    setRiskLevel,
    prize,
    setPrize,
}: CreateEventRiskSelectorProps) {
    return (
        <>
            <View style={styles.riskSelector}>
                <Text style={styles.label}>NÍVEL DE RISCO</Text>
                <View style={styles.riskButtons}>
                    {(['low', 'medium', 'high'] as const).map((level) => (
                        <TouchableOpacity
                            key={level}
                            style={[
                                styles.riskButton,
                                riskLevel === level && styles.riskButtonActive,
                            ]}
                            onPress={() => setRiskLevel(level)}
                        >
                            <Text
                                style={[
                                    styles.riskButtonText,
                                    riskLevel === level && styles.riskButtonTextActive,
                                ]}
                            >
                                {level === 'low' ? 'BAIXO' : level === 'medium' ? 'MÉDIO' : 'ALTO'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <FormInput
                label="PREMIAÇÃO"
                placeholder="Ex: R$ 500 ou Respeito"
                value={prize}
                onChangeText={setPrize}
            />
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        fontSize: 12,
        letterSpacing: 1,
    },
    riskSelector: {
        marginBottom: 20,
    },
    riskButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    riskButton: {
        flex: 1,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 12,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    riskButtonActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    riskButtonText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.textSecondary,
        fontSize: 12,
    },
    riskButtonTextActive: {
        color: '#000',
    },
});
