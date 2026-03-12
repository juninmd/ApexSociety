import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../theme';

interface FormInputProps extends TextInputProps {
    label: string;
    isTextArea?: boolean;
}

export default function FormInput({ label, isTextArea, style, ...props }: FormInputProps) {
    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, isTextArea && styles.textArea, style]}
                placeholderTextColor={theme.colors.secondary}
                multiline={isTextArea}
                numberOfLines={isTextArea ? 4 : 1}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputGroup: { marginBottom: 20 },
    label: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        fontSize: 12,
        letterSpacing: 1,
    },
    input: {
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        color: theme.colors.text,
        padding: 15,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 16,
    },
    textArea: { height: 100, textAlignVertical: 'top' },
});
