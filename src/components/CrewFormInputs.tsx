import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface CrewFormInputsProps {
    name: string;
    setName: (name: string) => void;
    tag: string;
    setTag: (tag: string) => void;
    description: string;
    setDescription: (description: string) => void;
}

export default function CrewFormInputs({
    name,
    setName,
    tag,
    setTag,
    description,
    setDescription,
}: CrewFormInputsProps) {
    return (
        <>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>NOME DA EQUIPE</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Corredores Noturnos"
                    placeholderTextColor={theme.colors.secondary}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>TAG (MÁX 5 CARACTERES)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: CORR"
                    placeholderTextColor={theme.colors.secondary}
                    value={tag}
                    onChangeText={(text) => setTag(text.toUpperCase())}
                    maxLength={5}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>DESCRIÇÃO</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Sobre o que é a sua equipe?"
                    placeholderTextColor={theme.colors.secondary}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: theme.colors.card,
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.regular,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});
